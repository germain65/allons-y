// Fichier : src/services/PaymentProvider.js
// Rôle : Service de gestion des paiements (Mobile Money)

class PaymentProvider {
  async initPayment(amount, phone, reference) { throw new Error('Not implemented'); }
  async checkPaymentStatus(reference) { throw new Error('Not implemented'); }
  async refund(reference, amount) { throw new Error('Not implemented'); }
}

class ConsolePaymentProvider extends PaymentProvider {
  async initPayment(amount, phone, reference) {
    console.log(`💸 [PAIEMENT] Init - Ref: ${reference}, Montant: ${amount}, Tel: ${phone}`);
    return { success: true, transactionId: `txn_${Date.now()}` };
  }
  
  async checkPaymentStatus(reference) {
    console.log(`💸 [PAIEMENT] Check - Ref: ${reference}`);
    return { status: 'successful' };
  }
  
  async refund(reference, amount) {
    console.log(`💸 [PAIEMENT] Refund - Ref: ${reference}, Montant: ${amount}`);
    return { success: true };
  }
}

const paymentProvider = new ConsolePaymentProvider();
export default paymentProvider;
