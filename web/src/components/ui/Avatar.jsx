// Fichier : src/components/ui/Avatar.jsx
// Rôle : Composant d'avatar utilisateur premium

import React from 'react';

const Avatar = ({ src, alt, size = 'md', onClick }) => {
  const sizeClass = `avatar-${size}`;
  
  const commonStyles = {
    cursor: onClick ? 'pointer' : 'default',
    transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
    border: '2px solid var(--border-default, var(--color-border))',
    boxShadow: 'var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.05))',
    objectFit: 'cover'
  };

  if (src) {
    return (
      <img 
        src={src} 
        alt={alt || "Avatar"} 
        className={`avatar ${sizeClass}`} 
        onClick={onClick}
        style={commonStyles}
        onMouseOver={(e) => onClick && (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseOut={(e) => onClick && (e.currentTarget.style.transform = 'scale(1)')}
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
        ...commonStyles,
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, var(--primary, var(--color-primary)), var(--primary-hover, var(--color-primary-dark, #2563eb)))',
        color: 'white',
        fontWeight: '600',
        textShadow: '0 1px 2px rgba(0,0,0,0.2)'
      }}
      onMouseOver={(e) => onClick && (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseOut={(e) => onClick && (e.currentTarget.style.transform = 'scale(1)')}
    >
      {initials}
    </div>
  );
};

export default Avatar;
