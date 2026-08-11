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
    <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <button className="btn btn-ghost" style={{ padding: 0 }} onClick={() => step === 1 ? navigate(-1) : setStep(1)}>
          ←
        </button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
            <div style={{ width: '30px', height: '4px', backgroundColor: step >= 1 ? 'var(--color-primary)' : 'var(--color-border)', borderRadius: '2px' }}></div>
            <div style={{ width: '30px', height: '4px', backgroundColor: step >= 2 ? 'var(--color-primary)' : 'var(--color-border)', borderRadius: '2px' }}></div>
          </div>
        </div>
        <div style={{ width: '24px' }}></div> {/* Spacer */}
      </div>

      <h1 style={{ marginBottom: '2rem' }}>{t('auth.signup')}</h1>

      <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', animation: 'fadeIn 0.3s' }}>
            
            <div style={{ display: 'flex', backgroundColor: 'var(--color-surface)', padding: '0.25rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <div 
                style={{ flex: 1, textAlign: 'center', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', backgroundColor: formData.role === 'rider' ? 'var(--color-primary)' : 'transparent', color: formData.role === 'rider' ? 'white' : 'var(--color-text)', transition: 'all 0.2s' }}
                onClick={() => setFormData({...formData, role: 'rider'})}
              >
                {t('auth.rider')}
              </div>
              <div 
                style={{ flex: 1, textAlign: 'center', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', backgroundColor: formData.role === 'driver' ? 'var(--color-primary)' : 'transparent', color: formData.role === 'driver' ? 'white' : 'var(--color-text)', transition: 'all 0.2s' }}
                onClick={() => setFormData({...formData, role: 'driver'})}
              >
                {t('auth.driver')}
              </div>
            </div>

            <div className="input-group">
              <label>{t('auth.firstName')}</label>
              <input type="text" className="input" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>{t('auth.lastName')}</label>
              <input type="text" className="input" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>{t('auth.phone')}</label>
              <input type="tel" className="input" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>{t('auth.email')}</label>
              <input type="email" className="input" name="email" value={formData.email} onChange={handleChange} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', animation: 'slideIn 0.3s' }}>
            <div className="input-group">
              <label>{t('auth.province')}</label>
              <select className="select" name="province" value={formData.province} onChange={handleChange} required>
                <option value="">Sélectionner une province</option>
                <option value="Nord-Kivu">Nord-Kivu</option>
                <option value="Sud-Kivu">Sud-Kivu</option>
              </select>
            </div>
            <div className="input-group">
              <label>{t('auth.city')}</label>
              <select className="select" name="city" value={formData.city} onChange={handleChange} required>
                <option value="">Sélectionner une ville</option>
                <option value="Goma">Goma</option>
                <option value="Bukavu">Bukavu</option>
              </select>
            </div>
            <div className="input-group">
              <label>{t('auth.password')}</label>
              <input type="password" className="input" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>{t('auth.confirmPassword')}</label>
              <input type="password" className="input" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            </div>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', fontSize: '0.875rem' }}>
              <input type="checkbox" required />
              {t('auth.terms')}
            </label>
          </div>
        )}

        <div style={{ marginTop: 'auto', paddingBottom: '2rem' }}>
          {step === 1 ? (
            <button type="button" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }} onClick={handleNext}>
              {t('auth.next')}
            </button>
          ) : (
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
              {t('auth.submit')}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
