// Fichier : src/services/VerificationProvider.js
// Rôle : Service de vérification d'identité et de véhicule

class VerificationProvider {
  async verifyIdentity(userId, documentPath) { throw new Error('Not implemented'); }
  async verifyLicense(userId, licensePlate) { throw new Error('Not implemented'); }
  async getVerificationStatus(userId) { throw new Error('Not implemented'); }
}

class ConsoleVerificationProvider extends VerificationProvider {
  async verifyIdentity(userId, documentPath) {
    console.log(`🛂 [VERIF] Identité - User: ${userId}, Doc: ${documentPath}`);
    return { status: 'pending', message: 'Vérification manuelle requise' };
  }

  async verifyLicense(userId, licensePlate) {
    console.log(`🚗 [VERIF] Véhicule - User: ${userId}, Plaque: ${licensePlate}`);
    return { status: 'pending', message: 'Vérification manuelle requise' };
  }

  async getVerificationStatus(userId) {
    return { status: 'pending', message: 'Vérification manuelle requise' };
  }
}

const verificationProvider = new ConsoleVerificationProvider();
export default verificationProvider;
