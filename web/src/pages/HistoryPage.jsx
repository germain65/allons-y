// Fichier : src/pages/HistoryPage.jsx
// Rôle : Historique des courses passées (Design Premium)

import React from 'react';
import { useNavigate } from 'react-router-dom';

const HistoryPage = () => {
  const navigate = useNavigate();

  const rides = [
    { id: 1, date: '10 Août, 14:30', departure: 'Gare routière', destination: 'Aéroport de Goma', price: 3500, status: 'Terminée', rating: 5 },
    { id: 2, date: '08 Août, 09:15', departure: 'TMK', destination: 'ULPGL', price: 1500, status: 'Terminée', rating: 4 },
    { id: 3, date: '05 Août, 18:45', departure: 'Campus', destination: 'Rond Point BDGL', price: 2000, status: 'Annulée', rating: 0 },
  ];

  return (
    <div className="container animate-fadeIn" style={{ padding: '1.5rem 1rem', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <button 
          className="btn btn-ghost" 
          style={{ padding: '0.5rem', marginRight: '1rem', background: 'var(--color-surface)', borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} 
          onClick={() => navigate(-1)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>Mes Courses</h1>
      </div>

      {rides.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛣️</div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Aucune course pour l'instant</h3>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '250px' }}>Commandez votre première course et elle apparaîtra ici.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {rides.map((ride, index) => (
            <div 
              key={ride.id} 
              className="card animate-slideUp" 
              style={{ 
                padding: '1.25rem', 
                borderRadius: '16px', 
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                border: '1px solid var(--color-border)',
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <span className="badge" style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-secondary)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '600' }}>
                  {ride.date}
                </span>
                <span className={`badge ${ride.status === 'Terminée' ? 'badge-success' : 'badge-error'}`} style={{ padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '600' }}>
                  {ride.status}
                </span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', marginRight: '0.75rem' }}></div>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{ride.departure}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--color-text)', marginRight: '0.75rem' }}></div>
                    <span style={{ fontWeight: '600' }}>{ride.destination}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right', marginLeft: '1rem' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-text)' }}>{ride.price} FC</div>
                </div>
              </div>

              {ride.status === 'Terminée' && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                    Note: {ride.rating > 0 ? Array(ride.rating).fill('⭐').join('') : 'Non noté'}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
