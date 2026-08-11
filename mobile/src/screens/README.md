// Fichier : mobile/src/screens/README.md
// Rôle   : Documentation des écrans à implémenter dans l'app mobile

# Écrans mobiles à implémenter

Ce dossier contiendra les écrans de l'application mobile Allons-y.
L'architecture reprend exactement celle de l'app web pour maximiser
la réutilisation du code et la cohérence de l'expérience utilisateur.

## Écrans prévus

### Authentification
- [ ] `LoadingScreen.js` — Splash screen avec barre de progression
- [ ] `HomeScreen.js` — Accueil avec logo + boutons connexion/inscription
- [ ] `LoginScreen.js` — Formulaire de connexion (téléphone + mot de passe)
- [ ] `SignupScreen.js` — Inscription en 2 étapes
- [ ] `ForgotPasswordScreen.js` — Récupération de mot de passe

### Écrans principaux
- [ ] `MapScreen.js` — Carte + bottom sheet (rider flow ou driver flow)
- [ ] `ProfileScreen.js` — Profil utilisateur complet
- [ ] `HistoryScreen.js` — Historique des courses
- [ ] `NotificationsScreen.js` — Centre de notifications
- [ ] `SecurityScreen.js` — Numéros d'urgence et fonctions de sécurité
- [ ] `SettingsScreen.js` — Paramètres (thème, langue, unités, etc.)
- [ ] `HelpScreen.js` — FAQ et formulaire de contact

### Composants partagés à créer (dans `../components/`)
- [ ] `BottomSheet.js` — Conteneur draggable en bas de l'écran
- [ ] `DriverMarker.js` — Marqueur chauffeur sur la carte
- [ ] `DestinationSearch.js` — Barre de recherche de destination
- [ ] `PriceDisplay.js` — Affichage et ajustement du prix
- [ ] `DriverSearch.js` — Animation de recherche de chauffeur
- [ ] `DriverOffers.js` — Liste des contre-offres
- [ ] `RatingWidget.js` — Widget de notation 5 étoiles
- [ ] `ChatWindow.js` — Chat rider/driver
- [ ] `Avatar.js` — Photo de profil avec fallback initiales

## Code réutilisé depuis /shared/
- Constantes : provinces, types de compte, statuts, devise
- Pricing : calcul de prix avec les 4 facteurs
- Validation : validation téléphone, email, formulaires

## Notes de développement
- Utiliser `react-native-maps` au lieu de `react-leaflet`
- Utiliser `expo-location` pour la géolocalisation
- Utiliser `expo-image-picker` pour les uploads photo
- Le service API (`../services/api.js`) et Socket.IO (`../services/socket.js`) sont déjà prêts
