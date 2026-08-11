// Fichier : src/database/init.js
// Rôle : Initialisation SQLite et création des tables

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const db = new Database(path.join(__dirname, '../../allons-y.db'));

export const initDb = () => {
  db.pragma('journal_mode = WAL');

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT,
      phone TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      accountType TEXT NOT NULL DEFAULT 'rider',
      currentMode TEXT NOT NULL DEFAULT 'rider',
      province TEXT,
      city TEXT,
      profilePhoto TEXT,
      licensePlate TEXT,
      idCardPath TEXT,
      rating REAL DEFAULT 5.0,
      ratingCount INTEGER DEFAULT 0,
      isOnline INTEGER DEFAULT 0,
      lastLat REAL,
      lastLng REAL,
      lastLocationUpdate TEXT,
      notificationConsent INTEGER DEFAULT 1,
      createdAt TEXT DEFAULT (datetime('now')),
      updatedAt TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS rides (
      id TEXT PRIMARY KEY,
      riderId TEXT NOT NULL,
      driverId TEXT,
      pickupLat REAL NOT NULL,
      pickupLng REAL NOT NULL,
      pickupAddress TEXT,
      destLat REAL NOT NULL,
      destLng REAL NOT NULL,
      destAddress TEXT,
      destName TEXT,
      vehicleType TEXT NOT NULL DEFAULT 'moto',
      calculatedPrice INTEGER NOT NULL,
      chosenPrice INTEGER,
      agreedPrice INTEGER,
      status TEXT NOT NULL DEFAULT 'requested',
      cancellationReason TEXT,
      weatherCondition TEXT DEFAULT 'clear',
      createdAt TEXT DEFAULT (datetime('now')),
      updatedAt TEXT DEFAULT (datetime('now')),
      completedAt TEXT,
      FOREIGN KEY (riderId) REFERENCES users(id),
      FOREIGN KEY (driverId) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS ride_offers (
      id TEXT PRIMARY KEY,
      rideId TEXT NOT NULL,
      driverId TEXT NOT NULL,
      proposedPrice INTEGER NOT NULL,
      eta INTEGER,
      status TEXT NOT NULL DEFAULT 'pending',
      createdAt TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (rideId) REFERENCES rides(id),
      FOREIGN KEY (driverId) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS ratings (
      id TEXT PRIMARY KEY,
      rideId TEXT NOT NULL,
      fromUserId TEXT NOT NULL,
      toUserId TEXT NOT NULL,
      score INTEGER NOT NULL CHECK(score >= 1 AND score <= 5),
      comment TEXT,
      createdAt TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (rideId) REFERENCES rides(id)
    );

    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      rideId TEXT NOT NULL,
      senderId TEXT NOT NULL,
      content TEXT,
      type TEXT NOT NULL DEFAULT 'text',
      filePath TEXT,
      createdAt TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (rideId) REFERENCES rides(id)
    );

    CREATE TABLE IF NOT EXISTS notifications (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      title TEXT NOT NULL,
      body TEXT,
      type TEXT NOT NULL,
      isRead INTEGER DEFAULT 0,
      data TEXT,
      createdAt TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (userId) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS verification_codes (
      id TEXT PRIMARY KEY,
      userId TEXT,
      phone TEXT,
      email TEXT,
      code TEXT NOT NULL,
      type TEXT NOT NULL,
      expiresAt TEXT NOT NULL,
      used INTEGER DEFAULT 0,
      createdAt TEXT DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
    CREATE INDEX IF NOT EXISTS idx_rides_riderId ON rides(riderId);
    CREATE INDEX IF NOT EXISTS idx_rides_driverId ON rides(driverId);
    CREATE INDEX IF NOT EXISTS idx_rides_status ON rides(status);
    CREATE INDEX IF NOT EXISTS idx_ride_offers_rideId ON ride_offers(rideId);
    CREATE INDEX IF NOT EXISTS idx_messages_rideId ON messages(rideId);
    CREATE INDEX IF NOT EXISTS idx_notifications_userId ON notifications(userId);
  `);

  const countUserStmt = db.prepare('SELECT COUNT(*) as count FROM users');
  const { count } = countUserStmt.get();

  if (count === 0) {
    const passwordHash = bcrypt.hashSync('Test1234', 10);
    const insertUser = db.prepare(`
      INSERT INTO users (id, firstName, lastName, phone, password, accountType, currentMode, province, city, licensePlate, lastLat, lastLng, isOnline)
      VALUES (@id, @firstName, @lastName, @phone, @password, @accountType, @currentMode, @province, @city, @licensePlate, @lastLat, @lastLng, @isOnline)
    `);

    insertUser.run({ id: 'rider1', firstName: 'Marie', lastName: 'Kalala', phone: '+243970000001', password: passwordHash, accountType: 'rider', currentMode: 'rider', province: 'Nord-Kivu', city: 'Goma', licensePlate: null, lastLat: null, lastLng: null, isOnline: 0 });
    insertUser.run({ id: 'rider2', firstName: 'Pierre', lastName: 'Lukusa', phone: '+243970000002', password: passwordHash, accountType: 'rider', currentMode: 'rider', province: 'Sud-Kivu', city: 'Bukavu', licensePlate: null, lastLat: null, lastLng: null, isOnline: 0 });
    insertUser.run({ id: 'driver1', firstName: 'Jean', lastName: 'Kabila', phone: '+243970000003', password: passwordHash, accountType: 'driver', currentMode: 'driver', province: 'Nord-Kivu', city: 'Goma', licensePlate: 'NK-1234-AB', lastLat: -1.6750, lastLng: 29.2300, isOnline: 1 });
    insertUser.run({ id: 'driver2', firstName: 'Sophie', lastName: 'Mulunda', phone: '+243970000004', password: passwordHash, accountType: 'driver', currentMode: 'driver', province: 'Sud-Kivu', city: 'Bukavu', licensePlate: 'SK-5678-CD', lastLat: -2.5100, lastLng: 28.8620, isOnline: 1 });

    const insertRide = db.prepare(`
      INSERT INTO rides (id, riderId, driverId, pickupLat, pickupLng, destLat, destLng, calculatedPrice, agreedPrice, status, completedAt)
      VALUES (@id, @riderId, @driverId, @pickupLat, @pickupLng, @destLat, @destLng, @calculatedPrice, @agreedPrice, @status, @completedAt)
    `);

    insertRide.run({
      id: 'ride1', riderId: 'rider1', driverId: 'driver1',
      pickupLat: -1.6700, pickupLng: 29.2200, destLat: -1.6800, destLng: 29.2400,
      calculatedPrice: 1500, agreedPrice: 1500, status: 'completed', completedAt: new Date().toISOString()
    });
    console.log('✅ Base de données initialisée avec les données de test.');
  }
};
