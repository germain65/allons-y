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
    <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '2rem' }}>
      <button className="btn btn-ghost" style={{ alignSelf: 'flex-start', padding: 0, marginBottom: '2rem' }} onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>{t('auth.login')}</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
        <div className="input-group">
          <label>{t('auth.phone')}</label>
          <input 
            type="tel" 
            className="input" 
            value={phone} 
            onChange={e => setPhone(e.target.value)}
            placeholder="+243 99 000 0000"
            required
          />
        </div>

        <div className="input-group">
          <label>{t('auth.password')}</label>
          <input 
            type="password" 
            className="input" 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <div style={{ textAlign: 'right' }}>
          <Link to="/forgot-password" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
            {t('auth.forgotPassword')}
          </Link>
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', padding: '1rem' }}>
          {t('auth.login')}
        </button>
      </form>

      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <span style={{ color: 'var(--color-text-secondary)' }}>Pas encore de compte ? </span>
        <Link to="/signup" style={{ fontWeight: 600 }}>{t('auth.createAccount')}</Link>
      </div>
    </div>
  );
};

export default LoginPage;
