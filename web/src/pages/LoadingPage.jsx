// Fichier : src/pages/LoadingPage.jsx
// Rôle : Écran de chargement initial

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

const LoadingPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        if (isAuthenticated) navigate('/main');
        else navigate('/home');
      }, 1500); // Faux délai pour l'animation
      return () => clearTimeout(timer);
    }
  }, [loading, isAuthenticated, navigate]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'var(--color-primary)'
    }}>
      <div style={{ fontSize: '4rem', animation: 'pulse 1.5s infinite' }}>🛵</div>
      <h1 style={{ color: 'white', marginTop: '1rem', marginBottom: '0.5rem', fontSize: '2.5rem' }}>Allons-y</h1>
      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.125rem' }}>{t('app.tagline')}</p>
      
      <div style={{ width: '150px', height: '4px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '2px', marginTop: '2rem', overflow: 'hidden' }}>
        <div style={{ width: '50%', height: '100%', backgroundColor: 'white', borderRadius: '2px', animation: 'slideIn 1.5s infinite ease-in-out' }}></div>
      </div>
    </div>
  );
};

export default LoadingPage;
