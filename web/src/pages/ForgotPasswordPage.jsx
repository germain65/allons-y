// Fichier : src/pages/ForgotPasswordPage.jsx
// Rôle : Page de récupération de mot de passe

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('+243');
  const [code, setCode] = useState('');

  return (
    <div className="container" style={{ padding: '2rem 1rem', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <button className="btn btn-ghost" style={{ alignSelf: 'flex-start', padding: 0, marginBottom: '2rem' }} onClick={() => step === 1 ? navigate(-1) : setStep(1)}>
        ← Retour
      </button>

      <h1 style={{ marginBottom: '1rem' }}>Mot de passe oublié</h1>
      
      {step === 1 && (
        <div style={{ flex: 1 }}>
          <p style={{ marginBottom: '2rem' }}>Entrez votre numéro de téléphone pour recevoir un code de réinitialisation.</p>
          <div className="input-group">
            <label>Numéro de téléphone</label>
            <input type="tel" className="input" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={() => setStep(2)}>
            Envoyer le code
          </button>
        </div>
      )}

      {step === 2 && (
        <div style={{ flex: 1 }}>
          <p style={{ marginBottom: '2rem' }}>Entrez le code à 4 chiffres envoyé au {phone}.</p>
          <div className="input-group">
            <label>Code de vérification</label>
            <input type="text" className="input" value={code} onChange={e => setCode(e.target.value)} placeholder="0000" maxLength="4" style={{ letterSpacing: '0.5rem', textAlign: 'center', fontSize: '1.5rem' }} />
          </div>
          <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={() => navigate('/login')}>
            Valider
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
