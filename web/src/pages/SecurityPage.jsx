// Fichier : src/pages/SecurityPage.jsx
// Rôle : Page de sécurité et mot de passe (Design Premium)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SecurityPage = () => {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);

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
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>Sécurité</h1>
      </div>

      <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '1.5rem', border: '1px solid var(--color-border)' }}>
        <h3 style={{ margin: 0, marginBottom: '1.5rem', fontSize: '1.125rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>🔒</span> Changer le mot de passe
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="input-group">
            <input type={showPwd ? 'text' : 'password'} className="input" placeholder="Mot de passe actuel" style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '12px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }} />
          </div>
          <div className="input-group">
            <input type={showPwd ? 'text' : 'password'} className="input" placeholder="Nouveau mot de passe" style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '12px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }} />
          </div>
          <div className="input-group">
            <input type={showPwd ? 'text' : 'password'} className="input" placeholder="Confirmer le nouveau mot de passe" style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '12px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }} />
          </div>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
            <input type="checkbox" checked={showPwd} onChange={() => setShowPwd(!showPwd)} />
            Afficher les mots de passe
          </label>

          <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '12px', fontWeight: '600', marginTop: '0.5rem' }}>
            Sauvegarder le mot de passe
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', backgroundColor: 'rgba(239, 71, 111, 0.05)', border: '1px solid rgba(239, 71, 111, 0.2)' }}>
        <h3 style={{ color: 'var(--color-error)', margin: 0, marginBottom: '0.5rem', fontSize: '1.125rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>⚠️</span> Zone de danger
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
          La suppression de votre compte est définitive. Toutes vos données, y compris votre historique de courses, seront effacées.
        </p>
        <button className="btn btn-danger" style={{ width: '100%', padding: '1rem', borderRadius: '12px', fontWeight: '600', backgroundColor: 'var(--color-error)', color: 'white', border: 'none' }}>
          Supprimer mon compte
        </button>
      </div>
    </div>
  );
};

export default SecurityPage;
