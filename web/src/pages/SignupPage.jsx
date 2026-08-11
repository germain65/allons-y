// Fichier : src/pages/SignupPage.jsx
// Rôle : Page d'inscription (2 étapes)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

const SignupPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '+243',
    email: '',
    role: 'rider',
    province: '',
    city: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step === 1) setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    await signup(formData);
    navigate('/main');
  };

  return (
    <div className="container" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      paddingTop: '1rem',
      backgroundColor: 'var(--color-bg-base)',
      background: 'linear-gradient(180deg, rgba(255, 115, 0, 0.03) 0%, rgba(255,255,255,0) 100%)'
    }}>
      
      {/* Header & Progression */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <button className="btn btn-ghost" style={{ padding: '0.5rem', color: 'var(--color-text-secondary)' }} onClick={() => step === 1 ? navigate(-1) : setStep(1)}>
          ←
        </button>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: '8px', width: '60%' }}>
            <div style={{ 
              flex: 1, 
              height: '6px', 
              backgroundColor: 'var(--color-primary)', 
              borderRadius: '4px',
              transition: 'all 0.3s ease'
            }}></div>
            <div style={{ 
              flex: 1, 
              height: '6px', 
              backgroundColor: step === 2 ? 'var(--color-primary)' : 'var(--color-border)', 
              borderRadius: '4px',
              transition: 'all 0.3s ease'
            }}></div>
          </div>
        </div>
        <div style={{ width: '36px' }}></div>
      </div>

      <h1 style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 800 }}>{t('auth.signup')}</h1>

      <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {step === 1 && (
          <div className="animate-slideUp" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Sélecteur Rôle Premium */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div 
                onClick={() => setFormData({...formData, role: 'rider'})}
                style={{
                  padding: '1.5rem 1rem',
                  borderRadius: '16px',
                  border: formData.role === 'rider' ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
                  backgroundColor: formData.role === 'rider' ? 'rgba(255, 115, 0, 0.05)' : 'var(--color-surface)',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: formData.role === 'rider' ? '0 4px 12px rgba(255, 115, 0, 0.15)' : 'none'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🧑</div>
                <div style={{ fontWeight: 600, color: formData.role === 'rider' ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}>
                  {t('auth.rider')}
                </div>
              </div>
              
              <div 
                onClick={() => setFormData({...formData, role: 'driver'})}
                style={{
                  padding: '1.5rem 1rem',
                  borderRadius: '16px',
                  border: formData.role === 'driver' ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
                  backgroundColor: formData.role === 'driver' ? 'rgba(255, 115, 0, 0.05)' : 'var(--color-surface)',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: formData.role === 'driver' ? '0 4px 12px rgba(255, 115, 0, 0.15)' : 'none'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚗</div>
                <div style={{ fontWeight: 600, color: formData.role === 'driver' ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}>
                  {t('auth.driver')}
                </div>
              </div>
            </div>

            {/* Champs de formulaire */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="input-group" style={{ position: 'relative' }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <span style={{ position: 'absolute', left: '1rem', opacity: 0.5 }}>👤</span>
                  <input type="text" className="input premium-input" name="firstName" value={formData.firstName} onChange={handleChange} placeholder={t('auth.firstName')} required style={{ paddingLeft: '2.5rem', width: '100%' }} />
                </div>
              </div>
              <div className="input-group" style={{ position: 'relative' }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <span style={{ position: 'absolute', left: '1rem', opacity: 0.5 }}>👤</span>
                  <input type="text" className="input premium-input" name="lastName" value={formData.lastName} onChange={handleChange} placeholder={t('auth.lastName')} required style={{ paddingLeft: '2.5rem', width: '100%' }} />
                </div>
              </div>
            </div>

            <div className="input-group" style={{ position: 'relative' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <span style={{ position: 'absolute', left: '1rem', opacity: 0.5 }}>📱</span>
                <input type="tel" className="input premium-input" name="phone" value={formData.phone} onChange={handleChange} placeholder={t('auth.phone')} required style={{ paddingLeft: '2.5rem', width: '100%' }} />
              </div>
            </div>
            
            <div className="input-group" style={{ position: 'relative' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <span style={{ position: 'absolute', left: '1rem', opacity: 0.5 }}>✉️</span>
                <input type="email" className="input premium-input" name="email" value={formData.email} onChange={handleChange} placeholder={t('auth.email')} style={{ paddingLeft: '2.5rem', width: '100%' }} />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-slideLeft" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="input-group" style={{ position: 'relative' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <span style={{ position: 'absolute', left: '1rem', opacity: 0.5 }}>🗺️</span>
                <select className="select premium-input" name="province" value={formData.province} onChange={handleChange} required style={{ paddingLeft: '2.5rem', width: '100%' }}>
                  <option value="" disabled>Sélectionner une province</option>
                  <option value="Nord-Kivu">Nord-Kivu</option>
                  <option value="Sud-Kivu">Sud-Kivu</option>
                </select>
              </div>
            </div>
            
            <div className="input-group" style={{ position: 'relative' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <span style={{ position: 'absolute', left: '1rem', opacity: 0.5 }}>🏙️</span>
                <select className="select premium-input" name="city" value={formData.city} onChange={handleChange} required style={{ paddingLeft: '2.5rem', width: '100%' }}>
                  <option value="" disabled>Sélectionner une ville</option>
                  <option value="Goma">Goma</option>
                  <option value="Bukavu">Bukavu</option>
                </select>
              </div>
            </div>
            
            <div className="input-group" style={{ position: 'relative' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <span style={{ position: 'absolute', left: '1rem', opacity: 0.5 }}>🔒</span>
                <input type="password" className="input premium-input" name="password" value={formData.password} onChange={handleChange} placeholder={t('auth.password')} required style={{ paddingLeft: '2.5rem', width: '100%' }} />
              </div>
            </div>
            
            <div className="input-group" style={{ position: 'relative' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <span style={{ position: 'absolute', left: '1rem', opacity: 0.5 }}>🔐</span>
                <input type="password" className="input premium-input" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder={t('auth.confirmPassword')} required style={{ paddingLeft: '2.5rem', width: '100%' }} />
              </div>
            </div>
            
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <input type="checkbox" required style={{ marginTop: '0.25rem', width: '1.25rem', height: '1.25rem', accentColor: 'var(--color-primary)' }} />
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
                J'accepte les <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>conditions d'utilisation</span> et la politique de confidentialité de Allons-y.
              </span>
            </label>
          </div>
        )}

        <div style={{ marginTop: 'auto', paddingBottom: '2rem', paddingTop: '2rem' }}>
          {step === 1 ? (
            <button type="button" className="btn btn-primary premium-btn" onClick={handleNext}>
              {t('auth.next')}
            </button>
          ) : (
            <button type="submit" className="btn btn-primary premium-btn">
              {t('auth.submit')}
            </button>
          )}
        </div>
      </form>

      <style>{`
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-slideLeft {
          animation: slideLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .premium-input {
          height: 3.5rem !important;
          border-radius: 12px !important;
          border: 1px solid var(--color-border) !important;
          background-color: var(--color-surface) !important;
          transition: all 0.2s ease !important;
        }
        .premium-input:focus {
          border-color: var(--color-primary) !important;
          box-shadow: 0 0 0 4px rgba(255, 115, 0, 0.1) !important;
        }
        .premium-btn {
          width: 100%;
          padding: 1rem !important;
          border-radius: 12px !important;
          font-size: 1.125rem !important;
          font-weight: 600 !important;
          box-shadow: 0 4px 14px rgba(255, 115, 0, 0.4) !important;
          transition: transform 0.2s, box-shadow 0.2s !important;
        }
        .premium-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 115, 0, 0.5) !important;
        }
      `}</style>
    </div>
  );
};

export default SignupPage;
