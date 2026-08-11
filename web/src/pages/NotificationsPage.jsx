// Fichier : src/pages/NotificationsPage.jsx
// Rôle : Page des notifications (Design Premium)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotificationsPage = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'promo', title: 'Offre promotionnelle', message: '20% de réduction sur votre prochaine course ! Profitez-en aujourd\'hui.', date: 'Il y a 2 heures', unread: true },
    { id: 2, type: 'info', title: 'Bienvenue', message: 'Bienvenue sur Allons-y, plus proche que jamais. Découvrez nos services.', date: 'Hier', unread: false },
    { id: 3, type: 'alert', title: 'Mise à jour', message: 'Une nouvelle version de l\'application est disponible.', date: 'Il y a 3 jours', unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const getIcon = (type) => {
    switch(type) {
      case 'promo': return '🎉';
      case 'alert': return '⚠️';
      default: return '👋';
    }
  };

  return (
    <div className="container animate-fadeIn" style={{ padding: '1.5rem 1rem', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button 
            className="btn btn-ghost" 
            style={{ padding: '0.5rem', marginRight: '1rem', background: 'var(--color-surface)', borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} 
            onClick={() => navigate(-1)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>Notifications</h1>
        </div>
        {unreadCount > 0 && (
          <span className="badge" style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '999px', fontWeight: 'bold' }}>
            {unreadCount}
          </span>
        )}
      </div>

      {notifications.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.8 }}>📭</div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Tout est calme</h3>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '250px' }}>Vous n'avez aucune notification pour le moment.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {notifications.map((notif, index) => (
            <div 
              key={notif.id} 
              className="card animate-slideUp" 
              onClick={() => markAsRead(notif.id)}
              style={{ 
                padding: '1.25rem', 
                borderRadius: '16px',
                border: 'none',
                backgroundColor: notif.unread ? 'var(--color-surface)' : 'transparent',
                boxShadow: notif.unread ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                borderBottom: notif.unread ? 'none' : '1px solid var(--color-border)',
                display: 'flex',
                gap: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              {notif.unread && (
                <div style={{ position: 'absolute', top: '1.5rem', left: '0', width: '4px', height: '16px', backgroundColor: 'var(--color-primary)', borderTopRightRadius: '4px', borderBottomRightRadius: '4px' }}></div>
              )}
              
              <div style={{ 
                width: '48px', height: '48px', borderRadius: '50%', 
                backgroundColor: notif.unread ? 'rgba(239, 71, 111, 0.1)' : 'var(--color-bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0
              }}>
                {getIcon(notif.type)}
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                  <h4 style={{ margin: 0, fontWeight: notif.unread ? '700' : '500', fontSize: '1rem', color: 'var(--color-text)' }}>{notif.title}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap', marginLeft: '0.5rem' }}>{notif.date}</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', color: notif.unread ? 'var(--color-text)' : 'var(--color-text-secondary)', lineHeight: '1.4' }}>
                  {notif.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
