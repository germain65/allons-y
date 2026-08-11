// Fichier : src/pages/HistoryPage.jsx
// Rôle : Historique des courses passées

import React from 'react';
import { useNavigate } from 'react-router-dom';

const HistoryPage = () => {
  const navigate = useNavigate();

  const rides = [
    { id: 1, date: '10 Août, 14:30', destination: 'Aéroport de Goma', price: 3500, status: 'Terminée', rating: 5 },
    { id: 2, date: '08 Août, 09:15', destination: 'ULPGL', price: 1500, status: 'Terminée', rating: 4 },
    { id: 3, date: '05 Août, 18:45', destination: 'Rond Point BDGL', price: 2000, status: 'Annulée', rating: 0 },
  ];

  return (
    <div className="container" style={{ padding: '2rem 1rem', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <button className="btn btn-ghost" style={{ padding: 0, marginBottom: '2rem' }} onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <h1 style={{ marginBottom: '2rem' }}>Historique</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {rides.map(ride => (
          <div key={ride.id} className="card" style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>{ride.price} FC</span>
              <span className={`badge ${ride.status === 'Terminée' ? 'badge-success' : 'badge-error'}`}>{ride.status}</span>
            </div>
            <div style={{ marginBottom: '0.25rem' }}>{ride.destination}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
              <span>{ride.date}</span>
              {ride.rating > 0 && <span>⭐ {ride.rating}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
