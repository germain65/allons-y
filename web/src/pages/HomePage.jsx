// Fichier : src/pages/HomePage.jsx
// Rôle : Écran d'accueil de l'application

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'linear-gradient(135deg, var(--color-bg) 0%, #ffeae0 100%)',
      padding: '2rem'
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.8s ease-out' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🛵</div>
        <h1 style={{ fontSize: '3rem', color: 'var(--color-primary)', margin: 0, fontWeight: 800, letterSpacing: '-1px' }}>
          Allons-y
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--color-secondary)', fontWeight: 500, marginTop: '0.5rem' }}>
          {t('app.tagline')}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', animation: 'slideUp 0.5s ease-out 0.3s both' }}>
        <button 
          className="btn btn-primary" 
          style={{ width: '100%', padding: '1rem', fontSize: '1.125rem' }}
          onClick={() => navigate('/login')}
        >
          {t('auth.login')}
        </button>
        <button 
          className="btn btn-outline" 
          style={{ width: '100%', padding: '1rem', fontSize: '1.125rem', backgroundColor: 'var(--color-surface)' }}
          onClick={() => navigate('/signup')}
        >
          {t('auth.createAccount')}
        </button>
      </div>
    </div>
  );
};

export default HomePage;
