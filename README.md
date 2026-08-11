# 🛵 Allons-y — Application de Transport à la Demande (Goma & Bukavu, RDC)

**Allons-y** est une application complète de transport à la demande (style ride-hailing / moto-taxi) conçue spécifiquement pour la République Démocratique du Congo (lancement ciblé à **Goma** et **Bukavu**). Elle connecte les passagers avec les chauffeurs de moto et taxi à proximité, avec négociation de prix en temps réel.

---

## 🚀 Choix Techniques & Justifications

- **Budget V1 : 0 € / $0**. Aucune clé API payante requise.
- **Backend** : Node.js + Express + SQLite (`better-sqlite3`). SQLite a été choisi pour sa simplicité (zéro configuration, base fichier locale rapide), parfait pour démarrer sans déployer de serveur de base de données complexe.
- **Temps Réel** : Socket.IO (WebSockets). Pris pour la mise à jour instantanée des positions GPS des chauffeurs, l'envoi d'offres/contre-offres, et la messagerie instantanée.
- **Web Frontend** : React + Vite + Leaflet (`react-leaflet`). OpenStreetMap gratuit via Leaflet (pas de Google Maps payant). Interface responsive mobile-first.
- **Mobile** : React Native (Expo) — squelette d'architecture propre réutilisant le code métier, les types et la validation depuis `/shared`.
- **i18n** : `react-i18next` configuré en Français (par défaut) et préparé pour l'Anglais.

---

## 📁 Structure du Monorepo

```
allons-y/
├── backend/          # API REST + Socket.IO + Base de données SQLite
│   ├── src/
│   │   ├── config/         # Variables d'environnement & configuration
│   │   ├── database/       # Schéma SQLite, seeds & helpers DB
│   │   ├── middleware/     # Auth JWT, uploads Multer, gestion d'erreurs
│   │   ├── routes/         # Routes Express (auth, rides, users, ratings, chat, etc.)
│   │   ├── services/       # Couches d'abstraction (Payment, Notification, Verification, Map)
│   │   ├── socket/         # Gestionnaires d'événements Socket.IO temps réel
│   │   └── utils/          # Utilitaires JWT, helpers
│   └── uploads/            # Stockage sécurisé des photos et pièces d'identité
├── web/              # Application Web React (Mobile-First)
│   ├── src/
│   │   ├── components/     # Composants UI, carte Leaflet, BottomSheet, Chat, Rating
│   │   ├── contexts/       # AuthContext, ThemeContext, SocketContext, RideContext
│   │   ├── hooks/          # Geolocation, API custom hooks
│   │   ├── i18n/           # Traductions (FR par défaut, EN prêt)
│   │   ├── pages/          # Home, Loading, Login, Signup, Main, Profile, History, etc.
│   │   └── services/       # Client API et Socket.IO
├── mobile/           # Squelette React Native (Expo)
│   └── src/          # Architecture miroir du web, prêt pour React Navigation & Maps
├── shared/           # Code partagé (ESM)
│   ├── constants/    # 26 provinces RDC, villes, statuts de course, véhicules
│   ├── pricing/      # Algorithme de calcul de prix à 4 facteurs
│   └── validation/   # Schémas de validation partagés (téléphone RDC, email, mot de passe)
├── package.json      # Scripts monorepo racine
└── README.md         # Documentation du projet
```

---

## 🛠️ Installation et Lancement Local

### Prérequis
- **Node.js** v18+ et **npm** v9+

### 1. Installation des dépendances

À la racine du monorepo, lancez :

```bash
npm run install:all
```

Cette commande installe automatiquement les dépendances de la racine, de `/shared`, de `/backend` et de `/web`.

### 2. Variables d'environnement

Un fichier `.env` par défaut est déjà créé dans `/backend/.env` :

```env
PORT=3001
JWT_SECRET=allons-y-dev-secret-key-2024
JWT_REFRESH_SECRET=allons-y-dev-refresh-secret-2024
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Aucune clé API externe n'est requise.

### 3. Lancement simultané (Backend + Web)

À la racine du projet, lancez :

```bash
npm run dev
```

Ou lancez-les séparément dans deux terminaux :

```bash
# Terminal 1 : Backend (http://localhost:3001)
npm run backend:dev

# Terminal 2 : Frontend Web (http://localhost:5173)
npm run web:dev
```

### 4. Comptes de test pré-générés (Seed)

Au premier lancement du backend, la base SQLite est automatiquement initialisée avec des comptes de démonstration :

| Rôle | Nom | Téléphone | Mot de passe | Ville / Province |
|------|-----|-----------|--------------|-------------------|
| **Passager (Rider)** | Marie Kalala | `+243970000001` | `Test1234` | Goma, Nord-Kivu |
| **Passager (Rider)** | Pierre Lukusa | `+243970000002` | `Test1234` | Bukavu, Sud-Kivu |
| **Chauffeur (Driver)** | Jean Kabila | `+243970000003` | `Test1234` | Goma (Plaque NK-1234-AB) |
| **Chauffeur (Driver)** | Sophie Mulunda | `+243970000004` | `Test1234` | Bukavu (Plaque SK-5678-CD) |

---

## 🧮 Formule de Calcul du Prix

L'algorithme de pricing (`/shared/pricing/index.js`) calcule un prix suggéré basé sur **4 facteurs explicites** :

$$\text{PrixCalculé} = \text{PrixDeBase} \times \text{FacteurHeure} \times \text{FacteurDemande} \times \text{FacteurMétéo}$$

1. **Heure de la journée** : Majorations en heures de pointe (7h-9h, 17h-20h) et nuit (23h-5h).
2. **Demande dans la zone** : Facteur multiplicateur selon le nombre de courses actives à proximité.
3. **Conditions météo** : Majoration en cas de pluie (+30%) ou forte pluie (+50%).
4. **Moyenne glissante sur 7 jours** : Pondération (70% prix calculé + 30% moyenne historique de la même course).

Le passager conserve la liberté d'ajuster le prix proposé dans une fourchette bornee (ex: -20% à +30%).

---

## 🔄 État de l'Application Mobile (`/mobile`)

L'application mobile React Native / Expo est livrée sous forme de **squelette d'architecture propre** :
- Utilise la même palette de couleurs (`/mobile/src/theme/index.js`), les mêmes traductions (`/mobile/src/i18n`), et les mêmes clients API/Socket.IO (`/mobile/src/services/`).
- Importe directement la logique métier du dossier `/shared` (constants, pricing, validation).
- Structure de navigation répertoriée dans `mobile/src/navigation/AppNavigator.js`.
- Prête à être connectée à `react-native-maps` et `expo-location` pour un déploiement natif iOS/Android.

---

## 📈 Upgrade Path (Évolution vers la Production)

Le projet V1 est 100% gratuit à exécuter. Les couches d'intégration vers des services payants sont déjà **isolées derrière des interfaces abstraites** (Pattern Provider) dans `/backend/src/services/` :

1. **Paiement Mobile Money (M-Pesa, Airtel Money, Orange Money)** :
   - *Actuel* : `ConsolePaymentProvider` (simulation de paiement).
   - *Upgrade* : Implémenter `MobileMoneyPaymentProvider` via les API Vodacom M-Pesa / Airtel / Orange ou un agrégateur local (ex: FlexPay, Pawapay).
2. **Envoi SMS & Notifications réelles (Twilio / Africa's Talking)** :
   - *Actuel* : `ConsoleNotificationProvider` (affiche les codes OTP et SMS dans la console du backend).
   - *Upgrade* : Remplacer par `TwilioNotificationProvider` ou `AfricasTalkingNotificationProvider` sans modifier la logique d'authentification.
3. **Vérification d'Identité & Permis (KYC)** :
   - *Actuel* : `ConsoleVerificationProvider` (stockage sécurisé des pièces jointes dans `/uploads` sans contrôle automatique).
   - *Upgrade* : Connecter à une API de vérification d'identité (ex: Smile ID / IdentityPass).
4. **Fournisseur de Cartographie Avancée (Mapbox / Google Maps)** :
   - *Actuel* : `MapProvider` avec tuiles gratuites OpenStreetMap & routing Haversine.
   - *Upgrade* : Étendre `MapProvider` pour intégrer Mapbox Directions API ou Google Distance Matrix API.

---

## 🗺️ Roadmap Futures Versions

- [ ] **V1.1** : Intégration de WebRTC pour les appels vocaux gratuits in-app.
- [ ] **V1.2** : Finalisation des écrans UI natifs React Native pour iOS et Android.
- [ ] **V2.0** : Support des trajets interurbains (ex: Goma ↔ Bukavu par bateau/route).
- [ ] **V2.1** : Dashboard administrateur pour le suivi de la flotte et des litiges.

---

*Développé pour Allons-y DRC — Goma & Bukavu.*
