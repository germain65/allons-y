// Fichier : src/pages/SettingsPage.jsx
// Rôle : Page de paramètres (Design Premium)

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

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Custom Toggle Switch
  const ToggleSwitch = ({ checked, onChange }) => (
    <label style={{ position: 'relative', display: 'inline-block', width: '52px', height: '28px' }}>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ opacity: 0, width: 0, height: 0 }} />
      <span style={{ 
        position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, 
        backgroundColor: checked ? 'var(--color-primary)' : 'var(--color-border)', 
        borderRadius: '34px', transition: '0.3s ease-in-out',
        boxShadow: checked ? 'inset 0 0 5px rgba(0,0,0,0.1)' : 'none'
      }}>
        <span style={{ 
          position: 'absolute', content: '""', height: '20px', width: '20px', 
          left: checked ? '28px' : '4px', bottom: '4px', backgroundColor: 'white', 
          borderRadius: '50%', transition: '0.3s ease-in-out',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}></span>
      </span>
    </label>
  );

  return (
    <div className="container animate-fadeIn" style={{ padding: '1.5rem 1rem', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <button 
          className="btn btn-ghost" 
          style={{ padding: '0.5rem', marginRight: '1rem', background: 'var(--color-surface)', borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} 
          onClick={() => navigate(-1)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>{t('settings.title') || 'Paramètres'}</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Apparence */}
        <div className="card" style={{ padding: '1rem 1.5rem', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)', letterSpacing: '1px', marginBottom: '1rem', marginTop: 0 }}>Apparence</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.25rem' }}>{isDark ? '🌙' : '☀️'}</span>
              <span style={{ fontWeight: 500 }}>{t('settings.darkMode') || 'Mode sombre'}</span>
            </div>
            <ToggleSwitch checked={isDark} onChange={toggleTheme} />
          </div>
        </div>

        {/* Langue */}
        <div className="card" style={{ padding: '1rem 1.5rem', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)', letterSpacing: '1px', marginBottom: '1rem', marginTop: 0 }}>Langue</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div 
              onClick={() => changeLanguage('fr')}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', borderRadius: '12px', cursor: 'pointer', backgroundColor: i18n.language === 'fr' ? 'rgba(239, 71, 111, 0.05)' : 'transparent', border: i18n.language === 'fr' ? '1px solid var(--color-primary)' : '1px solid transparent' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><span style={{ fontSize: '1.25rem' }}>🇫🇷</span><span style={{ fontWeight: 500 }}>Français</span></div>
              {i18n.language === 'fr' && <span style={{ color: 'var(--color-primary)' }}>✓</span>}
            </div>
            <div 
              onClick={() => changeLanguage('en')}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', borderRadius: '12px', cursor: 'pointer', backgroundColor: i18n.language === 'en' ? 'rgba(239, 71, 111, 0.05)' : 'transparent', border: i18n.language === 'en' ? '1px solid var(--color-primary)' : '1px solid transparent' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><span style={{ fontSize: '1.25rem' }}>🇬🇧</span><span style={{ fontWeight: 500 }}>English</span></div>
              {i18n.language === 'en' && <span style={{ color: 'var(--color-primary)' }}>✓</span>}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card" style={{ padding: '1rem 1.5rem', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)', letterSpacing: '1px', marginBottom: '1rem', marginTop: 0 }}>Notifications</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 500 }}>Promotions et offres</span>
            <ToggleSwitch checked={true} onChange={() => {}} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 500 }}>Mises à jour de course</span>
            <ToggleSwitch checked={true} onChange={() => {}} />
          </div>
        </div>

        {/* À propos */}
        <div className="card" style={{ padding: '1rem 1.5rem', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)', letterSpacing: '1px', marginBottom: '1rem', marginTop: 0 }}>À propos</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border)', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 500 }}>Version</span>
            <span style={{ color: 'var(--color-text-secondary)' }}>2.0.0</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--color-primary)', fontWeight: 500, cursor: 'pointer' }}>
            <span>Conditions d'utilisation</span>
            <span>→</span>
          </div>
        </div>

        {/* Actions */}
        <div className="card" style={{ padding: '1rem', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid var(--color-border)', marginTop: '0.5rem' }}>
          <button className="btn" style={{ width: '100%', padding: '1rem', borderRadius: '12px', fontWeight: '600', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }} onClick={handleLogout}>
            {t('settings.logout') || 'Se déconnecter'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
