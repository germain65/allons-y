// Fichier : mobile/src/i18n/index.js
// Rôle   : Configuration i18next pour l'app mobile
//          Utilise les mêmes fichiers de traduction que l'app web

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// ============================================================
// TRADUCTIONS
// ============================================================
// Fichiers séparés à créer : fr.json et en.json
// Pour V1, on intègre les traductions de base directement ici.
// Plus tard, importer depuis des fichiers JSON séparés.

const resources = {
  fr: {
    translation: {
      app: {
        name: 'Allons-y',
        tagline: 'Plus proche que jamais',
      },
      auth: {
        login: 'Connexion',
        signup: 'Inscription',
        phone: 'Numéro de téléphone',
        password: 'Mot de passe',
        forgotPassword: 'Mot de passe oublié ?',
        createAccount: 'Créer un compte',
        logout: 'Déconnexion',
      },
      main: {
        searchPlaceholder: 'Où voulez-vous vous rendre ?',
        moto: 'Moto',
        taxi: 'Taxi',
      },
      ride: {
        findDriver: 'Trouver un chauffeur',
        cancelRide: 'Annuler la course',
        driverArriving: 'Votre chauffeur arrive dans',
        driverWaiting: 'Votre chauffeur vous attend',
        iAmComing: "D'accord, j'arrive",
        contactDriver: 'Contacter le chauffeur',
        minutes: 'min',
      },
      rating: {
        rateDriver: 'Notez votre chauffeur',
        rateRider: 'Notez votre passager',
        thanks: 'Merci pour votre avis et à très bientôt.',
        thanksDriver: 'Merci pour votre avis.',
        submit: 'Valider',
      },
      settings: {
        title: 'Paramètres',
        theme: 'Thème',
        language: 'Langue',
        darkMode: 'Mode sombre',
        lightMode: 'Mode clair',
        distance: 'Unité de distance',
        km: 'Kilomètres',
        miles: 'Miles',
        french: 'Français',
        english: 'English',
      },
      menu: {
        city: 'Ville',
        history: 'Historique',
        notifications: 'Notifications',
        security: 'Sécurité',
        settings: 'Paramètres',
        help: 'Aide & support',
        switchMode: 'Passer en mode',
        rider: 'passager',
        driver: 'chauffeur',
      },
    },
  },
  en: {
    translation: {
      app: {
        name: 'Allons-y',
        tagline: 'Closer than ever',
      },
      auth: {
        login: 'Login',
        signup: 'Sign up',
        phone: 'Phone number',
        password: 'Password',
        forgotPassword: 'Forgot password?',
        createAccount: 'Create account',
        logout: 'Logout',
      },
    },
  },
};

// ============================================================
// INITIALISATION
// ============================================================

i18n.use(initReactI18next).init({
  resources,
  lng: 'fr', // Français par défaut
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false, // React gère déjà l'échappement
  },
});

export default i18n;
