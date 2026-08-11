// Fichier : src/components/ride/DestinationSearch.jsx
// Rôle : Barre de recherche de destination

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DestinationSearch = ({ onSelectDestination }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Mock search for V1
  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    
    if (val.length > 2) {
      setSuggestions([
        { id: 1, name: 'Aéroport de Goma', lat: -1.660, lng: 29.230 },
        { id: 2, name: 'ULPGL', lat: -1.650, lng: 29.210 },
        { id: 3, name: 'Rond Point BDGL', lat: -1.670, lng: 29.225 }
      ]);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div>
      <div className="input-group">
        <input 
          type="text" 
          className="input" 
          placeholder={t('main.searchPlaceholder')}
          value={query}
          onChange={handleSearch}
          style={{ paddingLeft: '2.5rem' }}
        />
        <span style={{ position: 'absolute', marginLeft: '1rem', marginTop: '0.8rem' }}>🔍</span>
      </div>

      {suggestions.length > 0 && (
        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {suggestions.map(s => (
            <div 
              key={s.id} 
              style={{ padding: '0.75rem', borderBottom: '1px solid var(--color-border)', cursor: 'pointer' }}
              onClick={() => {
                setQuery(s.name);
                setSuggestions([]);
                onSelectDestination(s);
              }}
            >
              📍 {s.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DestinationSearch;
