// Fichier : src/components/ui/StarRating.jsx
// Rôle : Composant de notation par étoiles premium

import React, { useState } from 'react';

const StarRating = ({ initialRating = 0, readOnly = false, onChange }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleClick = (index) => {
    if (!readOnly) {
      setRating(index);
      if (onChange) onChange(index);
      
      // Trigger a tiny animation on the clicked star
      const el = document.getElementById(`star-${index}`);
      if (el) {
        el.style.transform = 'scale(1.3)';
        setTimeout(() => { el.style.transform = 'scale(1)'; }, 150);
      }
    }
  };

  return (
    <div className="rating-stars" style={{ display: 'flex', gap: '0.25rem', justifyContent: 'center' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          id={`star-${star}`}
          key={star}
          style={{
            cursor: readOnly ? 'default' : 'pointer',
            fontSize: '2.2rem',
            color: star <= (hover || rating) ? 'var(--warning, #F59E0B)' : 'var(--border-default, var(--color-border, #E5E7EB))',
            transition: 'color 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
            textShadow: star <= (hover || rating) ? '0 0 10px rgba(245, 158, 11, 0.3)' : 'none',
            display: 'inline-block'
          }}
          onClick={() => handleClick(star)}
          onMouseEnter={() => {
            if (!readOnly) {
              setHover(star);
            }
          }}
          onMouseLeave={() => !readOnly && setHover(0)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
