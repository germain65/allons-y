// Fichier : src/pages/LoginPage.jsx
// Rôle : Page de connexion

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [phone, setPhone] = useState('+243');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(phone, password);
    navigate('/main');
  };

  return (
    <div className="container" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      paddingTop: '1rem',
      backgroundColor: 'var(--color-bg-base)',
      background: 'radial-gradient(circle at top right, rgba(255, 115, 0, 0.05), transparent 400px)'
    }}>
      <div className="animate-fadeIn" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
        <button className="btn btn-ghost" style={{ alignSelf: 'flex-start', padding: '0.5rem 0', marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }} onClick={() => navigate(-1)}>
          ← Retour
        </button>
      </div>

      <div className="animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2.5rem', animationDelay: '0.2s', animationFillMode: 'both' }}>
        <div style={{
          width: '64px',
          height: '64px',
          background: 'var(--color-surface, #fff)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
          marginBottom: '1rem',
          border: '1px solid var(--color-border, #eee)'
        }}>
          <span style={{ fontSize: '2rem' }}>🛵</span>
        </div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Allons-y</h2>
      </div>

      <h1 className="animate-fadeIn" style={{ marginBottom: '2rem', fontSize: '2.25rem', fontWeight: 800, textAlign: 'center', animationDelay: '0.3s', animationFillMode: 'both' }}>
        Bon retour !
      </h1>

      <form onSubmit={handleSubmit} className="animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1, animationDelay: '0.4s', animationFillMode: 'both' }}>
        
        <div className="input-group" style={{ position: 'relative' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '0.5rem', display: 'block' }}>{t('auth.phone')}</label>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span style={{ position: 'absolute', left: '1rem', fontSize: '1.25rem', opacity: 0.5 }}>📱</span>
            <input 
              type="tel" 
              className="input" 
              value={phone} 
              onChange={e => setPhone(e.target.value)}
              placeholder="+243 99 000 0000"
              style={{ paddingLeft: '3rem', width: '100%', height: '3.5rem', borderRadius: '12px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}
              required
            />
          </div>
        </div>

        <div className="input-group" style={{ position: 'relative' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '0.5rem', display: 'block' }}>{t('auth.password')}</label>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span style={{ position: 'absolute', left: '1rem', fontSize: '1.25rem', opacity: 0.5 }}>🔒</span>
            <input 
              type="password" 
              className="input" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ paddingLeft: '3rem', width: '100%', height: '3.5rem', borderRadius: '12px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}
              required
            />
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <Link to="/forgot-password" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-primary)', textDecoration: 'none' }}>
            {t('auth.forgotPassword')}
          </Link>
        </div>

        <button type="submit" className="btn btn-primary" style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          borderRadius: '12px', 
          fontSize: '1.125rem', 
          fontWeight: 600,
          boxShadow: '0 4px 14px rgba(255, 115, 0, 0.4)',
          transition: 'transform 0.2s, box-shadow 0.2s'
        }}>
          {t('auth.login')}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border, #eee)' }}></div>
          <span style={{ padding: '0 1rem', color: 'var(--color-text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>ou</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border, #eee)' }}></div>
        </div>

        <button type="button" onClick={() => navigate('/signup')} className="btn btn-outline" style={{ 
          padding: '1rem', 
          borderRadius: '12px', 
          fontSize: '1.125rem', 
          fontWeight: 600,
          backgroundColor: 'transparent',
          color: 'var(--color-text-primary)'
        }}>
          {t('auth.createAccount')}
        </button>

      </form>

      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        button[type="submit"]:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 115, 0, 0.5) !important;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
