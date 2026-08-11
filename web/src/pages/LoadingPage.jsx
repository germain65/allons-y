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
      }, 2000); // Légèrement allongé pour apprécier l'animation
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
      background: 'linear-gradient(135deg, var(--color-primary) 0%, #d35400 100%)', // Orange profond
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Cercles de fond décoratifs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(40px)' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '300px', height: '300px', background: 'rgba(0,0,0,0.1)', borderRadius: '50%', filter: 'blur(40px)' }} />

      {/* Icône dans un cercle glassmorphism */}
      <div style={{
        width: '120px',
        height: '120px',
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        animation: 'pulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1)',
        marginBottom: '2rem'
      }}>
        <div style={{ fontSize: '4.5rem', animation: 'bounce 2s infinite' }}>🛵</div>
      </div>
      
      {/* Titre avec animation de reveal (fade In Up) */}
      <h1 className="animate-fadeIn" style={{ 
        color: 'white', 
        marginBottom: '0.5rem', 
        fontSize: '3rem',
        fontWeight: '800',
        letterSpacing: '-1px',
        textShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        Allons-y
      </h1>
      
      <p className="animate-fadeIn" style={{ 
        color: 'rgba(255,255,255,0.9)', 
        fontSize: '1.125rem',
        fontWeight: '500',
        animationDelay: '0.2s',
        animationFillMode: 'both'
      }}>
        {t('app.tagline')}
      </p>
      
      {/* Barre de progression élégante */}
      <div className="animate-fadeIn" style={{ 
        width: '180px', 
        height: '4px', 
        backgroundColor: 'rgba(255,255,255,0.2)', 
        borderRadius: '4px', 
        marginTop: '3rem', 
        overflow: 'hidden',
        animationDelay: '0.4s',
        animationFillMode: 'both'
      }}>
        <div style={{ 
          width: '50%', 
          height: '100%', 
          backgroundColor: 'white', 
          borderRadius: '4px', 
          animation: 'slideIn 1.5s infinite cubic-bezier(0.65, 0, 0.35, 1)' 
        }}></div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes slideIn {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;
