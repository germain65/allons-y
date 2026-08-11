// Fichier : src/components/layout/SideMenu.jsx
// Rôle : Menu latéral de l'application

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import Avatar from '../ui/Avatar';

const SideMenu = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout, switchRole } = useAuth();

  if (!isOpen) return null;

  const navigateTo = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} style={{ zIndex: 50, backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
      <div className={`side-menu ${isOpen ? 'open' : ''}`} style={{ display: 'flex', flexDirection: 'column', height: '100%', zIndex: 60, position: 'fixed', top: 0, left: 0, width: '80%', maxWidth: '300px', backgroundColor: 'var(--color-surface)', transition: 'transform 0.3s ease-in-out', transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '1rem' }} onClick={() => navigateTo('/profile')}>
          <Avatar src={user?.photo} alt={user?.firstName} size="lg" />
          <div>
            <h3 style={{ margin: 0 }}>{user?.firstName} {user?.lastName}</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              ⭐ {user?.rating || '5.0'}
            </p>
          </div>
        </div>
        
        <div style={{ padding: '1rem 0', flex: 1, overflowY: 'auto' }}>
          <MenuItem icon="🏠" label={t('menu.home')} onClick={() => navigateTo('/main')} />
          <MenuItem icon="📜" label={t('menu.history')} onClick={() => navigateTo('/history')} />
          <MenuItem icon="🔔" label={t('menu.notifications')} onClick={() => navigateTo('/notifications')} badge="3" />
          <MenuItem icon="🛡️" label={t('menu.security')} onClick={() => navigateTo('/security')} />
          <MenuItem icon="⚙️" label={t('menu.settings')} onClick={() => navigateTo('/settings')} />
          <MenuItem icon="❓" label={t('menu.help')} onClick={() => navigateTo('/help')} />
        </div>

        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
          <button 
            className="btn btn-outline" 
            style={{ width: '100%', marginBottom: '1rem' }}
            onClick={() => { switchRole(); onClose(); }}
          >
            {user?.role === 'rider' ? t('menu.switchToDriver') : t('menu.switchToRider')}
          </button>
        </div>
      </div>
    </>
  );
};

const MenuItem = ({ icon, label, onClick, badge }) => (
  <div 
    onClick={onClick}
    style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', hover: { backgroundColor: 'var(--color-bg)' } }}
  >
    <span style={{ fontSize: '1.25rem' }}>{icon}</span>
    <span style={{ flex: 1, fontWeight: 500 }}>{label}</span>
    {badge && <span className="badge badge-error">{badge}</span>}
  </div>
);

export default SideMenu;
