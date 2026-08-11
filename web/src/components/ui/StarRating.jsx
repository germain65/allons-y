// Fichier : src/components/ui/StarRating.jsx
// Rôle : Composant de notation par étoiles

import React, { useState } from 'react';

const StarRating = ({ initialRating = 0, readOnly = false, onChange }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleClick = (index) => {
    if (!readOnly) {
      setRating(index);
      if (onChange) onChange(index);
    }
  };

  return (
    <div className="rating-stars" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            cursor: readOnly ? 'default' : 'pointer',
            fontSize: '2rem',
            color: star <= (hover || rating) ? 'var(--color-warning)' : 'var(--color-border)',
            transition: 'color 0.2s',
          }}
          onClick={() => handleClick(star)}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(0)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
