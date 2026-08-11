// Fichier : src/pages/ProfilePage.jsx
// Rôle : Page de profil utilisateur (Design Premium)

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Avatar from '../components/ui/Avatar';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="container animate-fadeIn" style={{ padding: '0', minHeight: '100vh', backgroundColor: 'var(--color-bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Header Hero with Gradient */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-primary), #FF7B9C)',
        padding: '2rem 1rem 4rem 1rem',
        borderBottomLeftRadius: '32px',
        borderBottomRightRadius: '32px',
        position: 'relative'
      }}>
        <button 
          className="btn btn-ghost" 
          style={{ padding: '0.5rem', color: 'white', position: 'absolute', top: '1.5rem', left: '1rem', background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }} 
          onClick={() => navigate(-1)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 style={{ color: 'white', textAlign: 'center', marginTop: '0.5rem', fontSize: '1.25rem', fontWeight: '600' }}>Mon Profil</h1>
      </div>

      {/* Avatar Section */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-3rem', padding: '0 1.5rem' }}>
        <div style={{ position: 'relative', padding: '4px', background: 'var(--color-bg)', borderRadius: '50%', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
          <Avatar src={user?.photo} alt={user?.firstName} size="xl" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
          <button style={{ 
            position: 'absolute', bottom: '0', right: '0', width: '32px', height: '32px', 
            borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', 
            border: '2px solid var(--color-bg)', display: 'flex', alignItems: 'center', 
            justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
          </button>
        </div>
        
        <h2 style={{ marginTop: '1rem', marginBottom: '0.25rem', fontSize: '1.5rem', fontWeight: '700' }}>{user?.firstName} {user?.lastName}</h2>
        <div style={{ color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>{user?.phone}</div>
        <span className="badge" style={{ backgroundColor: 'rgba(239, 71, 111, 0.1)', color: 'var(--color-primary)', padding: '0.5rem 1rem', borderRadius: '999px', fontWeight: '600' }}>
          {user?.role === 'driver' ? '🚗 Chauffeur' : '👤 Passager'}
        </span>
      </div>

      {/* Info Cards Section */}
      <div style={{ padding: '2rem 1.5rem', flex: 1 }}>
        <div className="card" style={{ padding: '0', overflow: 'hidden', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '1.25rem', marginRight: '1rem' }}>⭐</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Note globale</div>
              <div style={{ fontWeight: '600', fontSize: '1rem' }}>{user?.rating || '5.0'} / 5.0</div>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '1.25rem', marginRight: '1rem' }}>📧</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Adresse Email</div>
              <div style={{ fontWeight: '600', fontSize: '1rem' }}>{user?.email || 'Non renseigné'}</div>
            </div>
          </div>
          
          {user?.role === 'driver' && (
            <div style={{ display: 'flex', alignItems: 'center', padding: '1rem 1.5rem' }}>
              <span style={{ fontSize: '1.25rem', marginRight: '1rem' }}>🚗</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Plaque d'immatriculation</div>
                <div style={{ fontWeight: '600', fontSize: '1rem' }}>{user?.licensePlate || '1234 AB 56'}</div>
              </div>
            </div>
          )}
        </div>

        <button className="btn btn-primary" style={{ width: '100%', marginTop: '2.5rem', padding: '1rem', borderRadius: '12px', fontSize: '1rem', fontWeight: '600', boxShadow: '0 4px 12px rgba(239, 71, 111, 0.3)' }}>
          Modifier mes informations
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
