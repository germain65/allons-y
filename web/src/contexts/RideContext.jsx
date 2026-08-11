// Fichier : src/contexts/RideContext.jsx
// Rôle : Gestion de l'état d'une course

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSocket } from './SocketContext';

const RideContext = createContext(null);

export const RideProvider = ({ children }) => {
  const { socket } = useSocket();
  const [rideState, setRideState] = useState('idle'); // idle, searching, offers, arriving, active, finished
  const [currentRide, setCurrentRide] = useState(null);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.on('ride:new_offer', (offer) => {
      setOffers(prev => [...prev, offer]);
    });

    socket.on('ride:status_update', (update) => {
      setRideState(update.status);
      if (update.ride) setCurrentRide(update.ride);
    });

    return () => {
      socket.off('ride:new_offer');
      socket.off('ride:status_update');
    };
  }, [socket]);

  const requestRide = (pickup, destination, vehicleType) => {
    setRideState('searching');
    setOffers([]);
    socket?.emit('ride:request', { pickup, destination, vehicleType });
  };

  const cancelRide = (reason) => {
    socket?.emit('ride:cancel', { rideId: currentRide?.id, reason });
    setRideState('idle');
    setCurrentRide(null);
    setOffers([]);
  };

  const acceptOffer = (offerId) => {
    socket?.emit('ride:accept_offer', { offerId });
    setRideState('arriving');
  };

  const simulateDriverArriving = () => {
    setRideState('arriving');
  };

  return (
    <RideContext.Provider value={{ 
      rideState, setRideState, 
      currentRide, setCurrentRide, 
      offers, requestRide, cancelRide, acceptOffer,
      simulateDriverArriving
    }}>
      {children}
    </RideContext.Provider>
  );
};

export const useRide = () => useContext(RideContext);
