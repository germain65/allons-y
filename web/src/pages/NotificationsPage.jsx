// Fichier : src/pages/NotificationsPage.jsx
// Rôle : Page des notifications

import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotificationsPage = () => {
  const navigate = useNavigate();

  const notifications = [
    { id: 1, title: 'Offre promotionnelle', message: '20% de réduction sur votre prochaine course !', date: 'Aujourd\'hui', unread: true },
    { id: 2, title: 'Bienvenue', message: 'Bienvenue sur Allons-y, plus proche que jamais.', date: 'Hier', unread: false },
  ];

  return (
    <div className="container" style={{ padding: '2rem 1rem', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <button className="btn btn-ghost" style={{ padding: 0, marginBottom: '2rem' }} onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <h1 style={{ marginBottom: '2rem' }}>Notifications</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {notifications.map(notif => (
          <div key={notif.id} className="card" style={{ padding: '1rem', borderLeft: notif.unread ? '4px solid var(--color-primary)' : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span style={{ fontWeight: 'bold' }}>{notif.title}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{notif.date}</span>
            </div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>{notif.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
