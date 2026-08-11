// Fichier : src/components/ui/Avatar.jsx
// Rôle : Composant d'avatar utilisateur

import React from 'react';

const Avatar = ({ src, alt, size = 'md', onClick }) => {
  const sizeClass = `avatar-${size}`;
  
  if (src) {
    return (
      <img 
        src={src} 
        alt={alt || "Avatar"} 
        className={`avatar ${sizeClass}`} 
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      />
    );
  }

  // Fallback initiales
  const initials = alt ? alt.substring(0, 2).toUpperCase() : '??';
  
  return (
    <div 
      className={`avatar ${sizeClass}`}
      onClick={onClick}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'var(--color-primary-light)',
        color: 'white',
        fontWeight: 'bold',
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      {initials}
    </div>
  );
};

export default Avatar;
