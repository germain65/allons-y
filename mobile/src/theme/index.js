// Fichier : mobile/src/theme/index.js
// Rôle   : Système de thème (light/dark) pour l'app mobile Allons-y
//          Palette de couleurs identique à l'app web

// ============================================================
// PALETTE DE COULEURS ALLONS-Y
// ============================================================

export const colors = {
  primary: '#FF6B35',
  primaryDark: '#E85A2B',
  primaryLight: '#FF8F66',
  secondary: '#1B4965',
  secondaryLight: '#2A6F97',
  accent: '#2EC4B6',
  success: '#06D6A0',
  warning: '#FFD166',
  error: '#EF476F',
  white: '#FFFFFF',
  black: '#000000',
};

// ============================================================
// THÈMES
// ============================================================

export const lightTheme = {
  mode: 'light',
  colors: {
    ...colors,
    background: '#FAFBFC',
    surface: '#FFFFFF',
    surfaceSecondary: '#F3F4F6',
    text: '#1A1B1E',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    border: '#E5E7EB',
    shadow: 'rgba(0, 0, 0, 0.1)',
    overlay: 'rgba(0, 0, 0, 0.5)',
    inputBackground: '#F9FAFB',
  },
};

export const darkTheme = {
  mode: 'dark',
  colors: {
    ...colors,
    background: '#0F1419',
    surface: '#1E2328',
    surfaceSecondary: '#2A2F35',
    text: '#E8EAED',
    textSecondary: '#9AA0A8',
    textTertiary: '#6B7280',
    border: '#374151',
    shadow: 'rgba(0, 0, 0, 0.3)',
    overlay: 'rgba(0, 0, 0, 0.7)',
    inputBackground: '#2A2F35',
  },
};

// ============================================================
// TYPOGRAPHIE
// ============================================================

export const typography = {
  h1: { fontSize: 32, fontWeight: '800', lineHeight: 40 },
  h2: { fontSize: 24, fontWeight: '700', lineHeight: 32 },
  h3: { fontSize: 20, fontWeight: '600', lineHeight: 28 },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  bodySmall: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
  button: { fontSize: 16, fontWeight: '700', lineHeight: 24 },
  buttonSmall: { fontSize: 14, fontWeight: '600', lineHeight: 20 },
};

// ============================================================
// ESPACEMENT
// ============================================================

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// ============================================================
// RAYONS DE BORDURE
// ============================================================

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export default { colors, lightTheme, darkTheme, typography, spacing, borderRadius };
