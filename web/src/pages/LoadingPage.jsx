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
      background: '#f6f4ef',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <div style={{
        width: '96px',
        height: '96px',
        background: '#ffffff',
        borderRadius: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)',
        border: '1px solid rgba(15, 23, 42, 0.08)',
        marginBottom: '1.5rem'
      }}>
        <div style={{ fontSize: '3.5rem' }}>🛵</div>
      </div>
      
      <h1 className="animate-fadeIn" style={{ 
        color: '#18212f',
        marginBottom: '0.5rem', 
        fontSize: '2.25rem',
        fontWeight: '750',
        letterSpacing: '0'
      }}>
        Allons-y
      </h1>
      
      <p className="animate-fadeIn" style={{ 
        color: '#5f6b7a', 
        fontSize: '1rem',
        fontWeight: '500',
        animationDelay: '0.2s',
        animationFillMode: 'both'
      }}>
        {t('app.tagline')}
      </p>
      
      <div className="animate-fadeIn" style={{ 
        width: '180px', 
        height: '3px', 
        backgroundColor: 'rgba(15,23,42,0.08)', 
        borderRadius: '4px', 
        marginTop: '3rem', 
        overflow: 'hidden',
        animationDelay: '0.4s',
        animationFillMode: 'both'
      }}>
        <div style={{ 
          width: '50%', 
          height: '100%', 
          backgroundColor: 'var(--color-primary)', 
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
