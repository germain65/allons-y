// Fichier : src/pages/SettingsPage.jsx
// Rôle : Page de paramètres (Thème, Langue, etc.)

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const SettingsPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem('language', e.target.value);
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <button className="btn btn-ghost" style={{ padding: 0, marginBottom: '2rem' }} onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <h1 style={{ marginBottom: '2rem' }}>{t('settings.title')}</h1>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 500 }}>{t('settings.darkMode')}</span>
          <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
            <input type="checkbox" checked={isDark} onChange={toggleTheme} style={{ opacity: 0, width: 0, height: 0 }} />
            <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: isDark ? 'var(--color-primary)' : 'var(--color-border)', borderRadius: '34px', transition: '.4s' }}>
              <span style={{ position: 'absolute', content: '""', height: '16px', width: '16px', left: isDark ? '30px' : '4px', bottom: '4px', backgroundColor: 'white', borderRadius: '50%', transition: '.4s' }}></span>
            </span>
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 500 }}>{t('settings.language')}</span>
          <select className="select" style={{ width: 'auto', padding: '0.25rem 0.5rem' }} value={i18n.language} onChange={changeLanguage}>
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 500 }}>{t('settings.distanceUnit')}</span>
          <select className="select" style={{ width: 'auto', padding: '0.25rem 0.5rem' }}>
            <option value="km">Kilomètres (km)</option>
            <option value="mi">Miles (mi)</option>
          </select>
        </div>

      </div>

      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button className="btn btn-outline" style={{ width: '100%', color: 'var(--color-error)', borderColor: 'var(--color-error)' }} onClick={handleLogout}>
          {t('settings.logout')}
        </button>
        <button className="btn btn-ghost" style={{ width: '100%', color: 'var(--color-error)', fontSize: '0.875rem' }} onClick={() => { if(window.confirm(t('settings.confirmDelete'))) handleLogout(); }}>
          {t('settings.deleteAccount')}
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
