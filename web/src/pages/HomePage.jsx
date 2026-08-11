// Fichier : src/pages/HomePage.jsx
// Rôle : Écran d'accueil ultra-moderne de l'application

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div style={{ 
      minHeight: '100dvh', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'space-between',
      background: 'radial-gradient(circle at top right, rgba(255, 107, 53, 0.15), transparent 50%), radial-gradient(circle at bottom left, rgba(27, 73, 101, 0.1), transparent 50%), var(--color-bg)',
      padding: '2.5rem 1.5rem',
      boxSizing: 'border-box'
    }}>
      {/* Top Header / Brand Badge */}
      <div style={{ display: 'flex', justifyContent: 'center' }} className="animate-fadeIn">
        <span className="badge badge-success" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', letterSpacing: '0.5px' }}>
          📍 Goma & Bukavu, RDC
        </span>
      </div>

      {/* Hero Section */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', margin: 'auto 0' }} className="animate-fadeIn">
        <div 
          style={{ 
            fontSize: '4.5rem', 
            marginBottom: '1rem',
            width: '100px',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '50%',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--glass-border)'
          }}
          className="animate-bounce"
        >
          🛵
        </div>

        <h1 style={{ 
          fontSize: '3.25rem', 
          color: 'var(--color-text)', 
          margin: '0.5rem 0 0.25rem', 
          fontWeight: 800, 
          letterSpacing: '-1.5px',
          lineHeight: 1.1
        }}>
          Allons-y
        </h1>
        
        <p style={{ 
          fontSize: '1.125rem', 
          color: 'var(--color-text-secondary)', 
          fontWeight: 500, 
          maxWidth: '320px',
          marginTop: '0.5rem' 
        }}>
          {t('app.tagline')}
        </p>

        {/* Feature Highlights */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ background: 'var(--color-surface)', padding: '0.5rem 0.875rem', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', fontWeight: 600, border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xs)' }}>
            ⚡ Temps réel
          </div>
          <div style={{ background: 'var(--color-surface)', padding: '0.5rem 0.875rem', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', fontWeight: 600, border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xs)' }}>
            🤝 Prix négociable
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '400px', margin: '0 auto' }} className="animate-slideUp">
        <button 
          className="btn btn-primary" 
          style={{ width: '100%', padding: '1.125rem', fontSize: '1.125rem', fontWeight: 600 }}
          onClick={() => navigate('/login')}
        >
          {t('auth.login')}
        </button>
        <button 
          className="btn btn-outline" 
          style={{ width: '100%', padding: '1.125rem', fontSize: '1.125rem', fontWeight: 600, backgroundColor: 'var(--color-surface)' }}
          onClick={() => navigate('/signup')}
        >
          {t('auth.createAccount')}
        </button>
      </div>
    </div>
  );
};

export default HomePage;

