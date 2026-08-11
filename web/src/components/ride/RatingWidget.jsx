// Fichier : src/components/ride/RatingWidget.jsx
// Rôle : Widget pour noter une course terminée

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StarRating from '../ui/StarRating';

const RatingWidget = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);

  return (
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h3 style={{ marginBottom: '1rem' }}>Comment s'est passée votre course ?</h3>
      
      <div style={{ marginBottom: '2rem' }}>
        <StarRating initialRating={rating} onChange={setRating} />
      </div>

      {rating > 0 && (
        <button className="btn btn-primary" style={{ width: '100%', animation: 'slideUp 0.3s' }} onClick={() => onSubmit(rating)}>
          {t('rating.submit')}
        </button>
      )}
    </div>
  );
};

export default RatingWidget;
