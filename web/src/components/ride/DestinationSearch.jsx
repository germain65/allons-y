// Fichier: DestinationSearch.jsx
// Rôle: Composant de recherche de destination utilisant l'API Photon pour l'autocomplétion (Style Uber/Bolt)

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const DestinationSearch = ({ onSelectDestination, userPosition, userAddress }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const debounceRef = useRef(null);

  // Fonction pour déterminer l'icône selon le type de lieu
  const getIconForType = (type, osm_key) => {
    if (osm_key === 'building') return '🏢';
    if (osm_key === 'amenity' && type === 'hospital') return '🏥';
    if (osm_key === 'amenity' && type === 'restaurant') return '🍽️';
    if (osm_key === 'highway') return '🛣️';
    return '📍';
  };

  // Recherche Photon API avec debounce
  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      setError(null);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setError(null);
      
      try {
        let url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&lang=fr&limit=5`;
        if (userPosition && userPosition.lat && userPosition.lng) {
          url += `&lat=${userPosition.lat}&lon=${userPosition.lng}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erreur réseau');
        
        const data = await response.json();
        
        const results = data.features.map(feature => ({
          id: feature.properties.osm_id || Math.random().toString(),
          name: feature.properties.name || feature.properties.street || feature.properties.city || 'Inconnu',
          subtitle: [feature.properties.city, feature.properties.district, feature.properties.state].filter(Boolean).join(', '),
          lat: feature.geometry.coordinates[1],
          lng: feature.geometry.coordinates[0],
          type: feature.properties.osm_value,
          key: feature.properties.osm_key
        }));
        
        setSuggestions(results);
      } catch (err) {
        console.error("Erreur de recherche d'adresse:", err);
        setError('Impossible de charger les résultats');
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [query, userPosition]);

  return (
    <div style={styles.container}>
      {/* Conteneur des champs de recherche (Position + Destination) */}
      <div style={styles.searchBlock}>
        {/* Ligne verticale de liaison */}
        <div style={styles.timeline}>
          <div style={styles.dotGreen}></div>
          <div style={styles.line}></div>
          <div style={styles.dotRed}></div>
        </div>
        
        <div style={styles.inputsContainer}>
          {/* Champ Votre Position */}
          <div style={styles.inputWrapper}>
            <input 
              type="text" 
              style={{...styles.input, ...styles.inputReadonly}} 
              value={userAddress || 'Votre position'} 
              readOnly 
            />
          </div>
          
          {/* Champ Destination */}
          <div style={styles.inputWrapper}>
            <input 
              type="text" 
              style={styles.input} 
              placeholder="Où allez-vous ?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
            />
            {loading && <span style={styles.loader}>⏳</span>}
          </div>
        </div>
      </div>

      {/* Liste des suggestions avec animation */}
      {(isFocused && (suggestions.length > 0 || error)) && (
        <div style={styles.suggestionsContainer}>
          {error ? (
            <div style={styles.error}>{error}</div>
          ) : (
            suggestions.map((s, index) => (
              <div 
                key={s.id} 
                style={{
                  ...styles.suggestionItem,
                  animationDelay: `${index * 0.05}s`
                }}
                onClick={() => {
                  setQuery(s.name);
                  setSuggestions([]);
                  setIsFocused(false);
                  onSelectDestination({ name: s.name, lat: s.lat, lng: s.lng });
                }}
              >
                <div style={styles.suggestionIcon}>
                  {getIconForType(s.type, s.key)}
                </div>
                <div style={styles.suggestionText}>
                  <div style={styles.suggestionName}>{s.name}</div>
                  {s.subtitle && <div style={styles.suggestionSubtitle}>{s.subtitle}</div>}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    position: 'relative',
    fontFamily: 'Inter, sans-serif'
  },
  searchBlock: {
    display: 'flex',
    background: 'var(--color-surface, #ffffff)',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    position: 'relative'
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '16px',
    paddingTop: '12px',
    paddingBottom: '12px'
  },
  dotGreen: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#05a357',
    marginBottom: '4px'
  },
  line: {
    flex: 1,
    width: '2px',
    backgroundImage: 'linear-gradient(to bottom, #ccc 50%, transparent 50%)',
    backgroundSize: '2px 8px',
    margin: '4px 0'
  },
  dotRed: {
    width: '8px',
    height: '8px',
    backgroundColor: '#e11900',
    marginTop: '4px'
  },
  inputsContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  inputWrapper: {
    position: 'relative',
    width: '100%'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: 'none',
    backgroundColor: 'var(--color-background-alt, #f3f4f6)',
    borderRadius: '8px',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'all 0.2s ease'
  },
  inputReadonly: {
    color: '#6b7280',
    backgroundColor: 'transparent',
    paddingLeft: '0',
    borderBottom: '1px solid #e5e7eb',
    borderRadius: '0'
  },
  loader: {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '14px',
    animation: 'spin 1s linear infinite'
  },
  suggestionsContainer: {
    marginTop: '8px',
    background: 'var(--color-surface, #ffffff)',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    overflow: 'hidden',
    position: 'absolute',
    width: '100%',
    zIndex: 100
  },
  suggestionItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '14px 16px',
    borderBottom: '1px solid var(--color-border, #f3f4f6)',
    cursor: 'pointer',
    animation: 'slideIn 0.3s ease forwards',
    opacity: 0,
    transform: 'translateY(10px)',
    transition: 'background 0.2s ease'
  },
  suggestionIcon: {
    fontSize: '20px',
    marginRight: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    backgroundColor: 'var(--color-background-alt, #f3f4f6)',
    borderRadius: '50%'
  },
  suggestionText: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  suggestionName: {
    fontWeight: '500',
    fontSize: '15px',
    color: 'var(--color-text, #111827)'
  },
  suggestionSubtitle: {
    fontSize: '13px',
    color: 'var(--color-text-secondary, #6b7280)',
    marginTop: '2px'
  },
  error: {
    padding: '16px',
    color: '#e11900',
    textAlign: 'center',
    fontSize: '14px'
  }
};

// Injection des keyframes d'animation
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes slideIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes spin {
    100% {
      transform: translateY(-50%) rotate(360deg);
    }
  }
`;
if (typeof document !== 'undefined') document.head.appendChild(styleSheet);

export default DestinationSearch;
