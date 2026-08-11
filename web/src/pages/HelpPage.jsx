// Fichier : src/pages/HelpPage.jsx
// Rôle : Page d'aide et FAQ

import React from 'react';
import { useNavigate } from 'react-router-dom';

const HelpPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ padding: '2rem 1rem', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <button className="btn btn-ghost" style={{ padding: 0, marginBottom: '2rem' }} onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <h1 style={{ marginBottom: '2rem' }}>Aide & FAQ</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        <div className="card">
          <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Comment payer ma course ?</h3>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>Vous payez directement le chauffeur en espèces à la fin de la course.</p>
        </div>
        <div className="card">
          <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Comment devenir chauffeur ?</h3>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>Déconnectez-vous et créez un nouveau compte en choisissant l'option "Chauffeur".</p>
        </div>
        <div className="card">
          <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>J'ai oublié un objet</h3>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>Contactez immédiatement le support via la page Sécurité ou l'historique de course.</p>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '1rem' }}>Nous contacter</h3>
        <textarea className="textarea" placeholder="Décrivez votre problème..." style={{ minHeight: '100px', marginBottom: '1rem' }}></textarea>
        <button className="btn btn-primary" style={{ width: '100%' }}>Envoyer</button>
      </div>
    </div>
  );
};

export default HelpPage;
