// Fichier : mobile/App.js
// Rôle   : Point d'entrée de l'application mobile Allons-y (React Native / Expo)
//          Squelette prêt à être complété — architecture prévue pour réutiliser
//          le code partagé avec l'app web via le dossier /shared/

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

// ============================================================
// NOTE : Ce squelette est structuré pour réutiliser au maximum
// le code du dossier /shared/ (constantes, pricing, validation).
// L'architecture miroir l'app web pour faciliter le développement.
// ============================================================

/**
 * Écran d'accueil temporaire — remplacé plus tard par la navigation complète.
 * Affiche le logo et les boutons Connexion / Inscription.
 */
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Logo et titre */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoIcon}>🛵</Text>
        <Text style={styles.title}>Allons-y</Text>
        <Text style={styles.tagline}>Plus proche que jamais</Text>
      </View>

      {/* Boutons d'action */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Connexion</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Créer un compte</Text>
        </TouchableOpacity>
      </View>

      {/* Indicateur de version */}
      <Text style={styles.version}>v1.0.0 — Squelette</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1419',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoIcon: {
    fontSize: 72,
    marginBottom: 16,
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FF6B35',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    color: '#9AA0A8',
    marginTop: 8,
    letterSpacing: 1,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  secondaryButtonText: {
    color: '#FF6B35',
    fontSize: 18,
    fontWeight: '700',
  },
  version: {
    position: 'absolute',
    bottom: 40,
    color: '#6B7280',
    fontSize: 12,
  },
});
