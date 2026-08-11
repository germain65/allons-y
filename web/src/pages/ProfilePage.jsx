// Fichier : src/pages/ProfilePage.jsx
// Rôle : Page de profil utilisateur

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Avatar from '../components/ui/Avatar';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="container" style={{ padding: '2rem 1rem', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <button className="btn btn-ghost" style={{ padding: 0, marginBottom: '2rem' }} onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <h1 style={{ marginBottom: '2rem' }}>Mon Profil</h1>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ position: 'relative' }}>
          <Avatar src={user?.photo} alt={user?.firstName} size="lg" />
          <button style={{ position: 'absolute', bottom: 0, right: 0, width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            ✏️
          </button>
        </div>
        <h2 style={{ marginTop: '1rem', marginBottom: '0.25rem' }}>{user?.firstName} {user?.lastName}</h2>
        <div style={{ color: 'var(--color-text-secondary)' }}>{user?.phone}</div>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
          <span style={{ color: 'var(--color-text-secondary)' }}>Note</span>
          <span style={{ fontWeight: 'bold' }}>⭐ {user?.rating || '5.0'}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
          <span style={{ color: 'var(--color-text-secondary)' }}>Email</span>
          <span style={{ fontWeight: 'bold' }}>{user?.email || 'Non renseigné'}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
          <span style={{ color: 'var(--color-text-secondary)' }}>Type de compte</span>
          <span style={{ fontWeight: 'bold' }}>{user?.role === 'driver' ? 'Chauffeur' : 'Passager'}</span>
        </div>
        
        {user?.role === 'driver' && (
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem' }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>Plaque</span>
            <span style={{ fontWeight: 'bold' }}>{user?.licensePlate || '1234 AB 56'}</span>
          </div>
        )}
      </div>

      <button className="btn btn-primary" style={{ width: '100%', marginTop: '2rem' }}>
        Modifier le profil
      </button>
    </div>
  );
};

export default ProfilePage;
