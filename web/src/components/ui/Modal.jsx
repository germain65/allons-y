// Fichier : src/components/ui/Modal.jsx
// Rôle : Modal réutilisable

import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {title && (
          <h2 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.25rem' }}>{title}</h2>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
