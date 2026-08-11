// Fichier : mobile/src/navigation/AppNavigator.js
// Rôle   : Configuration de la navigation React Navigation
//          Structure préparée pour accueillir tous les écrans de l'app

import React from 'react';

// ============================================================
// STRUCTURE DE NAVIGATION PRÉVUE
// ============================================================
//
// Stack Navigator (racine)
// ├── LoadingScreen        — Splash screen avec barre de progression
// ├── HomeScreen           — Accueil avec logo + boutons connexion/inscription
// ├── LoginScreen          — Formulaire de connexion
// ├── SignupScreen         — Inscription en 2 étapes
// ├── ForgotPasswordScreen — Récupération de mot de passe
// └── MainNavigator (Tab Navigator — après connexion)
//     ├── MapTab            — Carte principale + bottom sheet (rider/driver flow)
//     ├── HistoryTab        — Historique des courses
//     ├── NotificationsTab  — Notifications
//     └── SettingsTab       — Paramètres
//
// Écrans modaux (accessibles depuis n'importe où) :
// ├── ProfileScreen        — Profil utilisateur
// ├── SecurityScreen       — Sécurité et numéros d'urgence
// ├── ChatScreen           — Chat avec chauffeur/passager
// └── HelpScreen           — Aide et support
//
// ============================================================

/**
 * Placeholder — à remplacer par la vraie implémentation
 * quand React Navigation sera configuré.
 */
export const navigationStructure = {
  initialRoute: 'Loading',
  screens: {
    auth: ['Loading', 'Home', 'Login', 'Signup', 'ForgotPassword'],
    main: ['Map', 'History', 'Notifications', 'Settings'],
    modal: ['Profile', 'Security', 'Chat', 'Help'],
  },
};

// Les écrans seront importés depuis ../screens/ quand ils seront créés
// Exemple :
// import LoadingScreen from '../screens/LoadingScreen';
// import HomeScreen from '../screens/HomeScreen';
// etc.
