// Fichier : src/pages/HelpPage.jsx
// Rôle : Page d'aide et FAQ (Design Premium)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HelpPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { id: 1, question: 'Comment payer ma course ?', answer: 'Vous payez directement le chauffeur en espèces à la fin de la course. Assurez-vous d\'avoir le montant exact si possible pour faciliter la transaction.' },
    { id: 2, question: 'Comment devenir chauffeur ?', answer: 'Déconnectez-vous et créez un nouveau compte en choisissant l\'option "Chauffeur". Vous devrez fournir les documents de votre véhicule.' },
    { id: 3, question: 'J\'ai oublié un objet', answer: 'Contactez immédiatement le support via les boutons ci-dessous ou depuis l\'historique de vos courses pour contacter le chauffeur.' },
    { id: 4, question: 'Comment annuler une course ?', answer: 'Vous pouvez annuler sans frais avant que le chauffeur n\'arrive. Appuyez simplement sur le bouton "Annuler" sur l\'écran de suivi.' }
  ];

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

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
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>Aide & Support</h1>
      </div>

      {/* Contact Section */}
      <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid var(--color-border)', marginBottom: '2rem' }}>
        <h3 style={{ margin: 0, marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>Besoin d'aide immédiate ?</h3>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Notre équipe de support est disponible 24/7 pour vous assister.</p>
        
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="btn" style={{ flex: '1 1 calc(50% - 0.5rem)', padding: '0.75rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', fontWeight: '600' }}>
            <span style={{ fontSize: '1.25rem' }}>📞</span> Appeler
          </button>
          <button className="btn" style={{ flex: '1 1 calc(50% - 0.5rem)', padding: '0.75rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', backgroundColor: '#25D366', color: 'white', border: 'none', fontWeight: '600' }}>
            <span style={{ fontSize: '1.25rem' }}>💬</span> WhatsApp
          </button>
          <button className="btn" style={{ flex: '1 1 100%', padding: '0.75rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', fontWeight: '600' }}>
            <span style={{ fontSize: '1.25rem' }}>📧</span> Envoyer un email
          </button>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1rem', paddingLeft: '0.5rem' }}>Questions fréquentes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {faqs.map((faq) => (
            <div 
              key={faq.id} 
              className="card" 
              style={{ 
                padding: '1.25rem', 
                borderRadius: '16px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)', 
                border: '1px solid var(--color-border)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => toggleFaq(faq.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: openFaq === faq.id ? '700' : '500', color: openFaq === faq.id ? 'var(--color-primary)' : 'var(--color-text)' }}>
                  {faq.question}
                </h4>
                <span style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', transform: openFaq === faq.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                  ↓
                </span>
              </div>
              
              <div style={{ 
                maxHeight: openFaq === faq.id ? '200px' : '0', 
                overflow: 'hidden', 
                transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease',
                opacity: openFaq === faq.id ? 1 : 0,
                marginTop: openFaq === faq.id ? '1rem' : '0'
              }}>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
