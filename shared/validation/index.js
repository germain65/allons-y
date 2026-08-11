// Fichier : shared/validation/index.js
// Rôle   : Validation des données utilisateur (inscription, connexion, etc.)
//          Utilisé côté client ET côté serveur pour cohérence

import { PROVINCES, LIMITS } from '../constants/index.js';

/**
 * Valide un numéro de téléphone congolais.
 * Formats acceptés :
 *   - +243XXXXXXXXX (international)
 *   - 0XXXXXXXXX (local)
 *   - XXXXXXXXX (9 chiffres sans préfixe)
 *
 * @param {string} phone — numéro à valider
 * @returns {{ valid: boolean, error?: string, normalized?: string }}
 */
export function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') {
    return { valid: false, error: 'Le numéro de téléphone est requis' };
  }

  // Retirer les espaces, tirets, points
  const cleaned = phone.replace(/[\s\-\.()]/g, '');

  // Format international : +243 suivi de 9 chiffres
  if (/^\+243\d{9}$/.test(cleaned)) {
    return { valid: true, normalized: cleaned };
  }

  // Format local : 0 suivi de 9 chiffres
  if (/^0\d{9}$/.test(cleaned)) {
    return { valid: true, normalized: '+243' + cleaned.substring(1) };
  }

  // 9 chiffres seuls
  if (/^\d{9}$/.test(cleaned)) {
    return { valid: true, normalized: '+243' + cleaned };
  }

  return {
    valid: false,
    error: 'Numéro invalide. Format attendu : +243XXXXXXXXX, 0XXXXXXXXX ou XXXXXXXXX',
  };
}

/**
 * Valide une adresse email (optionnelle mais si fournie, doit être correcte).
 * @param {string} email
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateEmail(email) {
  if (!email || email.trim() === '') {
    // L'email est optionnel
    return { valid: true };
  }

  // Regex simple mais fonctionnelle pour la plupart des cas
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { valid: false, error: 'Adresse email invalide' };
  }

  return { valid: true };
}

/**
 * Valide un mot de passe.
 * Exigences : au moins 8 caractères, au moins une lettre et un chiffre.
 * @param {string} password
 * @returns {{ valid: boolean, error?: string }}
 */
export function validatePassword(password) {
  if (!password) {
    return { valid: false, error: 'Le mot de passe est requis' };
  }

  if (password.length < LIMITS.PASSWORD_MIN_LENGTH) {
    return {
      valid: false,
      error: `Le mot de passe doit contenir au moins ${LIMITS.PASSWORD_MIN_LENGTH} caractères`,
    };
  }

  if (!/[a-zA-Z]/.test(password)) {
    return { valid: false, error: 'Le mot de passe doit contenir au moins une lettre' };
  }

  if (!/\d/.test(password)) {
    return { valid: false, error: 'Le mot de passe doit contenir au moins un chiffre' };
  }

  return { valid: true };
}

/**
 * Valide les deux mots de passe (mot de passe + confirmation).
 * @param {string} password
 * @param {string} confirmation
 * @returns {{ valid: boolean, error?: string }}
 */
export function validatePasswordMatch(password, confirmation) {
  const pwdCheck = validatePassword(password);
  if (!pwdCheck.valid) return pwdCheck;

  if (password !== confirmation) {
    return { valid: false, error: 'Les mots de passe ne correspondent pas' };
  }

  return { valid: true };
}

/**
 * Valide l'étape 1 de l'inscription (commune riders et drivers).
 * @param {Object} data
 * @param {string} data.firstName — prénom (requis)
 * @param {string} data.lastName — nom (requis)
 * @param {string} data.phone — téléphone (requis)
 * @param {string} [data.email] — email (optionnel)
 * @param {string} data.accountType — 'rider' ou 'driver'
 * @returns {{ valid: boolean, errors: Object }}
 */
export function validateSignupStep1(data) {
  const errors = {};

  if (!data.lastName || data.lastName.trim().length < 1) {
    errors.lastName = 'Le nom est requis';
  }

  if (!data.firstName || data.firstName.trim().length < 1) {
    errors.firstName = 'Le prénom est requis';
  }

  const phoneResult = validatePhone(data.phone);
  if (!phoneResult.valid) {
    errors.phone = phoneResult.error;
  }

  if (data.email) {
    const emailResult = validateEmail(data.email);
    if (!emailResult.valid) {
      errors.email = emailResult.error;
    }
  }

  if (!data.accountType || !['rider', 'driver'].includes(data.accountType)) {
    errors.accountType = 'Veuillez sélectionner un type de compte';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Valide l'étape 2 de l'inscription (spécifique au type de compte).
 * @param {Object} data
 * @param {string} data.accountType — 'rider' ou 'driver'
 * @param {string} data.province — province sélectionnée
 * @param {string} [data.city] — ville (requise pour drivers)
 * @param {string} data.password — mot de passe
 * @param {string} data.passwordConfirm — confirmation du mot de passe
 * @param {boolean} data.acceptTerms — acceptation des CGU
 * @param {string} [data.licensePlate] — plaque d'immatriculation (drivers)
 * @param {boolean} [data.hasIdCard] — pièce d'identité uploadée (drivers)
 * @param {boolean} [data.hasProfilePhoto] — photo de profil (requise pour drivers)
 * @returns {{ valid: boolean, errors: Object }}
 */
export function validateSignupStep2(data) {
  const errors = {};

  // Province (commune)
  const validProvinces = PROVINCES.map((p) => p.name);
  if (!data.province || !validProvinces.includes(data.province)) {
    errors.province = 'Veuillez sélectionner une province valide';
  }

  // Mot de passe (commun)
  const pwdResult = validatePasswordMatch(data.password, data.passwordConfirm);
  if (!pwdResult.valid) {
    errors.password = pwdResult.error;
  }

  // CGU (commun)
  if (!data.acceptTerms) {
    errors.acceptTerms = 'Vous devez accepter les conditions d\'utilisation';
  }

  // Champs spécifiques aux chauffeurs
  if (data.accountType === 'driver') {
    if (!data.city || data.city.trim().length < 1) {
      errors.city = 'La ville est requise pour les chauffeurs';
    }

    if (!data.licensePlate || data.licensePlate.trim().length < 2) {
      errors.licensePlate = 'Le numéro de plaque est requis';
    }

    if (!data.hasIdCard) {
      errors.idCard = 'La pièce d\'identité est requise';
    }

    if (!data.hasProfilePhoto) {
      errors.profilePhoto = 'La photo de profil est requise pour les chauffeurs';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Valide les données de connexion.
 * @param {Object} data
 * @param {string} data.phone — numéro de téléphone
 * @param {string} data.password — mot de passe
 * @returns {{ valid: boolean, errors: Object }}
 */
export function validateLogin(data) {
  const errors = {};

  const phoneResult = validatePhone(data.phone);
  if (!phoneResult.valid) {
    errors.phone = phoneResult.error;
  }

  if (!data.password || data.password.length < 1) {
    errors.password = 'Le mot de passe est requis';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
