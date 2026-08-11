// Fichier : src/pages/SecurityPage.jsx
// Rôle : Page de sécurité et numéros d'urgence

import React from 'react';
import { useNavigate } from 'react-router-dom';

const SecurityPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ padding: '2rem 1rem', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <button className="btn btn-ghost" style={{ padding: 0, marginBottom: '2rem' }} onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <h1 style={{ marginBottom: '2rem' }}>Sécurité</h1>

      <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'rgba(239, 71, 111, 0.1)', borderColor: 'var(--color-error)' }}>
        <h3 style={{ color: 'var(--color-error)', margin: 0, marginBottom: '0.5rem' }}>En cas d'urgence</h3>
        <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>Si vous êtes en danger immédiat, contactez les autorités.</p>
        <button className="btn btn-danger" style={{ width: '100%' }}>
          Appeler la Police (112)
        </button>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0, marginBottom: '1rem' }}>Support Allons-y</h3>
        <button className="btn btn-outline" style={{ width: '100%', marginBottom: '0.5rem' }}>
          📞 Appeler le support
        </button>
        <button className="btn btn-outline" style={{ width: '100%' }}>
          💬 Écrire au support
        </button>
      </div>

      <div className="card">
        <h3 style={{ margin: 0, marginBottom: '1rem' }}>Outils de sécurité</h3>
        <button className="btn btn-primary" style={{ width: '100%' }}>
          📍 Partager ma position en temps réel
        </button>
      </div>
    </div>
  );
};

export default SecurityPage;
