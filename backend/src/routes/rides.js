// Fichier : src/routes/rides.js
// Rôle : Routes de gestion des courses

import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database/init.js';
import { auth } from '../middleware/auth.js';
import pricingService from '../services/PricingService.js';
import mapProvider from '../services/MapProvider.js';
import { getIO } from '../socket/index.js';

const router = express.Router();

router.use(auth);

router.post('/calculate-price', async (req, res, next) => {
  try {
    const { pickupLat, pickupLng, destLat, destLng, vehicleType } = req.body;
    const distance = mapProvider.calculateDistance(pickupLat, pickupLng, destLat, destLng);
    const eta = mapProvider.calculateETA(distance, vehicleType || 'moto');
    const priceData = await pricingService.getPrice({ pickupLat, pickupLng, destLat, destLng, vehicleType });
    
    res.json({ distance, eta, priceData });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { pickupLat, pickupLng, destLat, destLng, destName, vehicleType, chosenPrice } = req.body;
    const id = uuidv4();
    
    db.prepare(`
      INSERT INTO rides (id, riderId, pickupLat, pickupLng, destLat, destLng, destName, vehicleType, calculatedPrice, chosenPrice, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'searching')
    `).run(id, req.user.id, pickupLat, pickupLng, destLat, destLng, destName, vehicleType || 'moto', chosenPrice, chosenPrice);
    
    const ride = db.prepare('SELECT * FROM rides WHERE id = ?').get(id);
    
    const io = getIO();
    io.to('drivers').emit('ride:new-request', ride);
    
    res.status(201).json(ride);
  } catch (err) {
    next(err);
  }
});

router.get('/nearby', (req, res, next) => {
  try {
    const rides = db.prepare("SELECT * FROM rides WHERE status = 'searching'").all();
    res.json(rides);
  } catch (err) {
    next(err);
  }
});

router.post('/:id/offer', async (req, res, next) => {
  try {
    const { proposedPrice } = req.body;
    const rideId = req.params.id;
    const offerId = uuidv4();
    
    db.prepare(`
      INSERT INTO ride_offers (id, rideId, driverId, proposedPrice, status)
      VALUES (?, ?, ?, ?, 'pending')
    `).run(offerId, rideId, req.user.id, proposedPrice);

    db.prepare("UPDATE rides SET status = 'offered' WHERE id = ? AND status = 'searching'").run(rideId);
    
    const ride = db.prepare('SELECT * FROM rides WHERE id = ?').get(rideId);
    getIO().to(ride.riderId).emit('ride:new-offer', { offerId, proposedPrice, driverId: req.user.id });
    
    res.json({ message: 'Offre soumise', offerId });
  } catch (err) {
    next(err);
  }
});

router.post('/:id/accept-offer/:offerId', async (req, res, next) => {
  try {
    const { id: rideId, offerId } = req.params;
    
    const offer = db.prepare('SELECT * FROM ride_offers WHERE id = ?').get(offerId);
    if (!offer) return res.status(404).json({ message: 'Offre introuvable' });

    db.prepare("UPDATE rides SET driverId = ?, agreedPrice = ?, status = 'accepted' WHERE id = ?").run(offer.driverId, offer.proposedPrice, rideId);
    db.prepare("UPDATE ride_offers SET status = 'rejected' WHERE rideId = ? AND id != ?").run(rideId, offerId);
    db.prepare("UPDATE ride_offers SET status = 'accepted' WHERE id = ?").run(offerId);

    getIO().to(offer.driverId).emit('ride:accepted', { rideId });
    
    res.json({ message: 'Offre acceptée' });
  } catch (err) {
    next(err);
  }
});

router.post('/:id/driver-arrived', async (req, res, next) => {
  try {
    const rideId = req.params.id;
    db.prepare("UPDATE rides SET status = 'waiting' WHERE id = ?").run(rideId);
    const ride = db.prepare('SELECT * FROM rides WHERE id = ?').get(rideId);
    getIO().to(ride.riderId).emit('ride:driver-arrived', { rideId });
    res.json({ message: 'Arrivée signalée' });
  } catch (err) {
    next(err);
  }
});

router.post('/:id/rider-ready', async (req, res, next) => {
  try {
    const rideId = req.params.id;
    const ride = db.prepare('SELECT * FROM rides WHERE id = ?').get(rideId);
    getIO().to(ride.driverId).emit('ride:rider-ready', { rideId });
    res.json({ message: 'Prêt signalé' });
  } catch (err) {
    next(err);
  }
});

router.post('/:id/start', async (req, res, next) => {
  try {
    const rideId = req.params.id;
    db.prepare("UPDATE rides SET status = 'in_progress' WHERE id = ?").run(rideId);
    const ride = db.prepare('SELECT * FROM rides WHERE id = ?').get(rideId);
    getIO().to(ride.riderId).emit('ride:started', { rideId });
    res.json({ message: 'Course démarrée' });
  } catch (err) {
    next(err);
  }
});

router.post('/:id/complete', async (req, res, next) => {
  try {
    const rideId = req.params.id;
    db.prepare("UPDATE rides SET status = 'completed', completedAt = datetime('now') WHERE id = ?").run(rideId);
    const ride = db.prepare('SELECT * FROM rides WHERE id = ?').get(rideId);
    getIO().to(ride.riderId).emit('ride:completed', { rideId });
    res.json({ message: 'Course terminée' });
  } catch (err) {
    next(err);
  }
});

router.post('/:id/cancel', async (req, res, next) => {
  try {
    const rideId = req.params.id;
    const { cancellationReason } = req.body;
    db.prepare("UPDATE rides SET status = 'cancelled', cancellationReason = ? WHERE id = ?").run(cancellationReason, rideId);
    const ride = db.prepare('SELECT * FROM rides WHERE id = ?').get(rideId);
    const otherParty = req.user.id === ride.riderId ? ride.driverId : ride.riderId;
    if (otherParty) getIO().to(otherParty).emit('ride:cancelled', { rideId, reason: cancellationReason });
    res.json({ message: 'Course annulée' });
  } catch (err) {
    next(err);
  }
});

router.get('/history', (req, res, next) => {
  try {
    const isDriver = req.user.currentMode === 'driver';
    const column = isDriver ? 'driverId' : 'riderId';
    const rides = db.prepare(`SELECT * FROM rides WHERE ${column} = ? ORDER BY createdAt DESC`).all(req.user.id);
    res.json(rides);
  } catch (err) {
    next(err);
  }
});

router.get('/active', (req, res, next) => {
  try {
    const isDriver = req.user.currentMode === 'driver';
    const column = isDriver ? 'driverId' : 'riderId';
    const ride = db.prepare(`SELECT * FROM rides WHERE ${column} = ? AND status NOT IN ('completed', 'cancelled') ORDER BY createdAt DESC LIMIT 1`).get(req.user.id);
    res.json(ride || null);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', (req, res, next) => {
  try {
    const ride = db.prepare('SELECT * FROM rides WHERE id = ?').get(req.params.id);
    res.json(ride);
  } catch (err) {
    next(err);
  }
});

export default router;
