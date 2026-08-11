// Fichier : src/services/NotificationProvider.js
// Rôle : Service d'envoi de notifications (SMS, Email, Push)

class NotificationProvider {
  async sendSMS(phone, message) { throw new Error('Not implemented'); }
  async sendEmail(email, subject, body) { throw new Error('Not implemented'); }
  async sendPush(userId, title, body, data) { throw new Error('Not implemented'); }
}

class ConsoleNotificationProvider extends NotificationProvider {
  async sendSMS(phone, message) {
    console.log(`📱 [SMS] À ${phone}: ${message}`);
    return true;
  }
  
  async sendEmail(email, subject, body) {
    console.log(`📧 [EMAIL] À ${email} | Sujet: ${subject}\n${body}`);
    return true;
  }
  
  async sendPush(userId, title, body, data) {
    console.log(`🔔 [PUSH] User ${userId} | ${title}: ${body}`, data ? data : '');
    return true;
  }
}

const notificationProvider = new ConsoleNotificationProvider();
export default notificationProvider;
