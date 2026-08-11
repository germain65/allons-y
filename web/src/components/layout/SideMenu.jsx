// Fichier : src/components/layout/SideMenu.jsx
// Rôle : Menu latéral de l'application (Premium)

import React, { useState } from 'react';
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
      <div 
        className="modal-overlay" 
        onClick={onClose} 
        style={{ 
          zIndex: 50, 
          backgroundColor: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          position: 'fixed', inset: 0,
          animation: 'fadeIn 0.3s ease'
        }}
      ></div>
      <div 
        className={`side-menu ${isOpen ? 'open' : ''}`} 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%', 
          zIndex: 60, 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '80%', 
          maxWidth: '320px', 
          backgroundColor: 'var(--bg-surface, var(--color-surface, #ffffff))', 
          transition: 'transform 0.4s cubic-bezier(0.19, 1, 0.22, 1)', 
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          boxShadow: '4px 0 24px rgba(0,0,0,0.1)',
          borderTopRightRadius: '16px',
          borderBottomRightRadius: '16px'
        }}
      >
        <div 
          style={{ 
            padding: '2.5rem 1.5rem 1.5rem', 
            borderBottom: '1px solid var(--border-default, var(--color-border, #f3f4f6))', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            cursor: 'pointer',
            backgroundColor: 'var(--bg-base, var(--color-bg, #f9fafb))'
          }} 
          onClick={() => navigateTo('/profile')}
        >
          <div style={{ position: 'relative' }}>
            <Avatar src={user?.photo} alt={user?.firstName} size="lg" />
            <span style={{ 
              position: 'absolute', 
              bottom: 0, right: 0, 
              backgroundColor: 'var(--success, #10B981)',
              width: '14px', height: '14px', 
              borderRadius: '50%', border: '2px solid white'
            }}></span>
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary, var(--color-text))' }}>
              {user?.firstName} {user?.lastName}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
              <span className="badge" style={{ fontSize: '0.75rem', backgroundColor: 'var(--primary-light, #e0e7ff)', color: 'var(--primary, #4338ca)', padding: '2px 8px', borderRadius: '12px' }}>
                {user?.role === 'driver' ? 'Chauffeur' : 'Passager'}
              </span>
              <p style={{ margin: 0, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary, #6b7280)' }}>
                ⭐ {user?.rating || '5.0'}
              </p>
            </div>
          </div>
        </div>
        
        <div style={{ padding: '1rem 0', flex: 1, overflowY: 'auto' }}>
          <MenuItem icon="🏠" label={t('menu.home')} onClick={() => navigateTo('/main')} />
          <MenuItem icon="📜" label={t('menu.history')} onClick={() => navigateTo('/history')} />
          <MenuItem icon="🔔" label={t('menu.notifications')} onClick={() => navigateTo('/notifications')} badge="3" />
          <MenuItem icon="🛡️" label={t('menu.security')} onClick={() => navigateTo('/security')} />
          
          <div style={{ height: '1px', backgroundColor: 'var(--border-default, var(--color-border, #f3f4f6))', margin: '0.5rem 1.5rem' }}></div>
          
          <MenuItem icon="⚙️" label={t('menu.settings')} onClick={() => navigateTo('/settings')} />
          <MenuItem icon="❓" label={t('menu.help')} onClick={() => navigateTo('/help')} />
        </div>

        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-default, var(--color-border, #f3f4f6))', backgroundColor: 'var(--bg-base, var(--color-bg, #f9fafb))' }}>
          <button 
            className="btn btn-primary" 
            style={{ 
              width: '100%', 
              marginBottom: '1rem',
              borderRadius: '12px',
              fontWeight: 600,
              padding: '0.75rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            onClick={() => { switchRole(); onClose(); }}
          >
            {user?.role === 'rider' ? t('menu.switchToDriver') : t('menu.switchToRider')}
          </button>
          <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary, #9ca3af)' }}>
            Allons-y v1.0.0
          </div>
        </div>
      </div>
    </>
  );
};

const MenuItem = ({ icon, label, onClick, badge }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        padding: '1rem 1.5rem', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem', 
        cursor: 'pointer',
        backgroundColor: isHovered ? 'var(--bg-base, var(--color-bg, #f3f4f6))' : 'transparent',
        borderLeft: isHovered ? '3px solid var(--primary, var(--color-primary))' : '3px solid transparent',
        transition: 'all 0.2s ease',
        color: 'var(--text-primary, var(--color-text))'
      }}
    >
      <span style={{ fontSize: '1.25rem', transition: 'transform 0.2s ease', transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}>{icon}</span>
      <span style={{ flex: 1, fontWeight: 500 }}>{label}</span>
      {badge && <span className="badge badge-error" style={{ borderRadius: '12px', padding: '2px 8px' }}>{badge}</span>}
      <span style={{ color: 'var(--text-secondary, #9ca3af)', opacity: isHovered ? 1 : 0.5, transition: 'opacity 0.2s' }}>›</span>
    </div>
  );
};

export default SideMenu;
