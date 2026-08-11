// Fichier : src/pages/MainPage.jsx
// Rôle : Page principale de l'application (carte MapLibre + flow course moderne)

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useGeolocation } from '../hooks/useGeolocation';
import { useRide } from '../contexts/RideContext';

import MapView from '../components/map/MapView';
import SideMenu from '../components/layout/SideMenu';
import BottomSheet from '../components/layout/BottomSheet';

// Rider components
import DestinationSearch from '../components/ride/DestinationSearch';
import PriceDisplay from '../components/ride/PriceDisplay';
import DriverSearch from '../components/ride/DriverSearch';
import DriverOffers from '../components/ride/DriverOffers';
import DriverArriving from '../components/ride/DriverArriving';
import ActiveRide from '../components/ride/ActiveRide';
import RatingWidget from '../components/ride/RatingWidget';
import CancelRide from '../components/ride/CancelRide';

// Driver components
import DriverDashboard from '../components/driver/DriverDashboard';
import ActiveTrip from '../components/driver/ActiveTrip';

const MainPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { position, address, addressLoading, loading: mapLoading } = useGeolocation();
  const { rideState, setRideState, currentRide, offers, requestRide, cancelRide, acceptOffer, simulateDriverArriving } = useRide();

  const [menuOpen, setMenuOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  
  // Driver state
  const [isOnline, setIsOnline] = useState(false);
  
  // Mock drivers on map
  const mockDrivers = [
    { id: 1, lat: position.lat + 0.005, lng: position.lng + 0.005, vehicleType: 'moto', firstName: 'Paul', rating: 4.8 },
    { id: 2, lat: position.lat - 0.005, lng: position.lng - 0.003, vehicleType: 'taxi', firstName: 'Jean', rating: 4.9 },
  ];

  const handleSelectDestination = (dest) => {
    setSelectedDestination(dest);
    setRideState('price_calc');
  };

  const handleConfirmPrice = (price, vehicle) => {
    requestRide(position, selectedDestination, vehicle);
    // Simulation: after 3 seconds, show mock offers
    setTimeout(() => {
      setRideState('offers');
    }, 3000);
  };

  const handleCancelRide = (reason) => {
    cancelRide(reason);
    setCancelModalOpen(false);
    setSelectedDestination(null);
  };

  const handleRatingSubmit = (rating) => {
    console.log("Rating submitted", rating);
    setRideState('idle');
    setSelectedDestination(null);
  };

  // Nom lisible de l'adresse utilisateur détectée
  const userAddressText = addressLoading 
    ? 'Détection de votre adresse...' 
    : address?.road || address?.suburb || address?.display_name || 'Position actuelle';

  return (
    <div style={{ height: '100dvh', width: '100vw', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Header Glassmorphisme / Menu Toggle */}
      <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', right: '1.25rem', zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'none' }}>
        <button 
          className="btn btn-icon btn-surface" 
          style={{ 
            pointerEvents: 'auto',
            width: '48px', 
            height: '48px', 
            borderRadius: '50%', 
            backgroundColor: 'var(--glass-bg)', 
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: 'var(--shadow-md)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontSize: '1.25rem', 
            border: '1px solid var(--glass-border)', 
            cursor: 'pointer' 
          }}
          onClick={() => setMenuOpen(true)}
          aria-label="Menu principal"
        >
          ☰
        </button>

        {/* Badge de statut / rôle */}
        <div 
          className="card-glass" 
          style={{ 
            pointerEvents: 'auto',
            padding: '0.5rem 1rem', 
            borderRadius: 'var(--radius-full)', 
            fontSize: '0.875rem', 
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: user?.role === 'driver' ? (isOnline ? 'var(--color-success)' : 'var(--color-text-secondary)') : 'var(--color-primary)' }}></span>
          {user?.role === 'driver' ? (isOnline ? 'Chauffeur En Ligne' : 'Hors Ligne') : 'Passager'}
        </div>
      </div>

      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Map Area */}
      <div style={{ flex: 1, position: 'relative' }}>
        <MapView 
          userPosition={position} 
          drivers={mockDrivers} 
          destinationPosition={selectedDestination ? { lat: selectedDestination.lat, lng: selectedDestination.lng } : null}
        />

        {/* Floating Action Button (FAB) pour recentrer le GPS */}
        <button
          className="btn btn-icon"
          style={{
            position: 'absolute',
            right: '1.25rem',
            bottom: rideState === 'idle' ? 'calc(35vh + 1rem)' : 'calc(55vh + 1rem)',
            zIndex: 30,
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            cursor: 'pointer',
            transition: 'all var(--transition-normal)'
          }}
          onClick={() => {
            // Recentrages gérés automatiquement par MapView sur changement de position, ou re-trigger
            window.dispatchEvent(new Event('resize'));
          }}
          title="Recentrer la carte"
        >
          🎯
        </button>
      </div>

      {/* Bottom Sheet Area */}
      <BottomSheet initialHeight={rideState === 'idle' ? '38vh' : '55vh'}>
        
        {/* RIDER FLOW */}
        {user?.role === 'rider' && (
          <>
            {rideState === 'idle' && (
              <DestinationSearch 
                userPosition={position}
                userAddress={userAddressText}
                onSelectDestination={handleSelectDestination} 
              />
            )}
            
            {rideState === 'price_calc' && (
              <div className="animate-fadeIn">
                <button className="btn btn-ghost" style={{ padding: '0.5rem 0', marginBottom: '0.5rem', fontWeight: 500 }} onClick={() => setRideState('idle')}>← Changer de destination</button>
                <div style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.5rem', color: 'var(--color-text)' }}>
                  Vers : {selectedDestination?.name}
                </div>
                <PriceDisplay onConfirm={handleConfirmPrice} />
              </div>
            )}

            {rideState === 'searching' && (
              <DriverSearch onCancel={() => setCancelModalOpen(true)} />
            )}

            {rideState === 'offers' && (
              <DriverOffers 
                offers={[
                  { id: 1, driver: mockDrivers[0], price: 2000, distance: 1.2, eta: 3 },
                  { id: 2, driver: mockDrivers[1], price: 2500, distance: 2.5, eta: 7 }
                ]} 
                onAccept={(id) => acceptOffer(id)} 
                onCancel={() => setCancelModalOpen(true)} 
              />
            )}

            {rideState === 'arriving' && (
              <DriverArriving 
                driver={mockDrivers[0]} 
                eta={3} 
                onContact={() => console.log('Contact')} 
                onCancel={() => setCancelModalOpen(true)} 
              />
            )}

            {rideState === 'active' && (
              <ActiveRide destination={selectedDestination} eta={12} />
            )}

            {rideState === 'finished' && (
              <RatingWidget onSubmit={handleRatingSubmit} />
            )}
          </>
        )}

        {/* DRIVER FLOW */}
        {user?.role === 'driver' && (
          <>
            {(rideState === 'idle' || rideState === 'searching') && (
              <DriverDashboard 
                isOnline={isOnline} 
                onToggleOnline={() => setIsOnline(!isOnline)}
                offers={isOnline ? [{
                  id: 101,
                  rider: { firstName: 'Alice', photo: null, rating: 4.9 },
                  pickupName: 'ULPGL',
                  destinationName: 'Aéroport',
                  price: 3000,
                  distance: 4.5
                }] : []}
                onAcceptOffer={() => setRideState('active_trip')}
                onProposePrice={(id, p) => console.log('Proposed', p)}
              />
            )}

            {rideState === 'active_trip' && (
              <ActiveTrip 
                trip={{ rider: { firstName: 'Alice', rating: 4.9 }, pickupName: 'ULPGL', destinationName: 'Aéroport' }}
                onArrived={() => console.log('Arrived')}
                onFinishTrip={() => setRideState('idle')}
                onContactRider={() => console.log('Contact rider')}
              />
            )}
          </>
        )}

      </BottomSheet>

      <CancelRide 
        isOpen={cancelModalOpen} 
        onClose={() => setCancelModalOpen(false)} 
        onConfirm={handleCancelRide} 
      />

    </div>
  );
};

export default MainPage;

