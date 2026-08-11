// Fichier : src/pages/ForgotPasswordPage.jsx
// Rôle : Page de récupération de mot de passe

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('+243');
  
  // Pour l'OTP
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus au prochain champ
    if (value !== '' && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Si on efface et que le champ est vide, on retourne au précédent
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const submitOtp = () => {
    const fullCode = otp.join('');
    if (fullCode.length === 4) {
      navigate('/login');
    }
  };

  return (
    <div className="container" style={{ 
      paddingTop: '1rem', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: 'var(--color-bg-base)',
      background: 'radial-gradient(circle at top left, rgba(255, 115, 0, 0.05), transparent 400px)'
    }}>
      
      <button className="btn btn-ghost animate-fadeIn" style={{ alignSelf: 'flex-start', padding: '0.5rem 0', marginBottom: '2rem', color: 'var(--color-text-secondary)' }} onClick={() => step === 1 ? navigate(-1) : setStep(1)}>
        ← Retour
      </button>

      <div className="animate-slideUp" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{
          width: '64px',
          height: '64px',
          background: 'rgba(255, 115, 0, 0.1)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
          color: 'var(--color-primary)'
        }}>
          <span style={{ fontSize: '2rem' }}>{step === 1 ? '🔐' : '✉️'}</span>
        </div>

        <h1 style={{ marginBottom: '1rem', fontSize: '2rem', fontWeight: 800 }}>
          {step === 1 ? 'Mot de passe oublié' : 'Vérification'}
        </h1>
        
        {step === 1 && (
          <div className="animate-fadeIn" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: '1.5', marginBottom: '2.5rem' }}>
              Entrez votre numéro de téléphone associé à votre compte. Nous vous enverrons un code pour réinitialiser votre mot de passe.
            </p>
            
            <div className="input-group" style={{ position: 'relative' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '0.5rem', display: 'block' }}>Numéro de téléphone</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <span style={{ position: 'absolute', left: '1rem', fontSize: '1.25rem', opacity: 0.5 }}>📱</span>
                <input 
                  type="tel" 
                  className="input" 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)}
                  style={{ paddingLeft: '3rem', width: '100%', height: '3.5rem', borderRadius: '12px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', fontSize: '1.125rem' }} 
                />
              </div>
            </div>

            <div style={{ marginTop: 'auto', paddingBottom: '2rem', paddingTop: '2rem' }}>
              <button className="btn btn-primary premium-btn" onClick={() => setStep(2)}>
                Envoyer le code
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-slideLeft" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: '1.5', marginBottom: '2.5rem' }}>
              Entrez le code à 4 chiffres envoyé au <strong style={{ color: 'var(--color-text-primary)' }}>{phone}</strong>.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  style={{
                    width: '3.5rem',
                    height: '4rem',
                    borderRadius: '12px',
                    border: '2px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface)',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    textAlign: 'center',
                    color: 'var(--color-primary)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-primary)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(255, 115, 0, 0.1)';
                  }}
                  onBlur={(e) => {
                    if (!e.target.value) {
                      e.target.style.borderColor = 'var(--color-border)';
                    }
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                  }}
                />
              ))}
            </div>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                Vous n'avez pas reçu le code ? <span style={{ color: 'var(--color-primary)', fontWeight: 600, cursor: 'pointer' }}>Renvoyer</span>
              </span>
            </div>

            <div style={{ marginTop: 'auto', paddingBottom: '2rem' }}>
              <button 
                className="btn btn-primary premium-btn" 
                onClick={submitOtp}
                disabled={otp.join('').length < 4}
                style={{ opacity: otp.join('').length < 4 ? 0.7 : 1 }}
              >
                Valider
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-slideLeft {
          animation: slideLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .premium-btn {
          width: 100%;
          padding: 1rem !important;
          border-radius: 12px !important;
          font-size: 1.125rem !important;
          font-weight: 600 !important;
          box-shadow: 0 4px 14px rgba(255, 115, 0, 0.4) !important;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s !important;
        }
        .premium-btn:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 115, 0, 0.5) !important;
        }
      `}</style>
    </div>
  );
};

export default ForgotPasswordPage;
