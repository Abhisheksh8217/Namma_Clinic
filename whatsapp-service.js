// WhatsApp Business API Service
const fetch = require('node-fetch');

class WhatsAppService {
    constructor() {
        // Using WhatsApp Business API (requires setup)
        this.apiUrl = 'https://graph.facebook.com/v17.0/YOUR_PHONE_NUMBER_ID/messages';
        this.accessToken = 'YOUR_WHATSAPP_ACCESS_TOKEN'; // Get from Meta Business
        
        // Alternative: Use a free service like Twilio Sandbox or similar
        this.useAlternative = true; // Set to true for free alternative
    }

    async sendMessage(phone, message) {
        if (this.useAlternative) {
            // Log the message (for now) - in production, integrate with free service
            console.log(`📱 WhatsApp Message to ${phone}:`);
            console.log(message);
            console.log('---');
            
            // Simulate successful sending
            return { success: true, messageId: 'sim_' + Date.now() };
        }

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messaging_product: 'whatsapp',
                    to: phone,
                    type: 'text',
                    text: { body: message }
                })
            });

            const result = await response.json();
            return { success: response.ok, data: result };
        } catch (error) {
            console.error('WhatsApp API Error:', error);
            return { success: false, error: error.message };
        }
    }

    async sendAppointmentNotification(patientData) {
        const { name, phone, date, time, status } = patientData;
        const message = this.generateMessage(name, date, time, status);
        
        return await this.sendMessage(phone, message);
    }

    generateMessage(name, date, time, status) {
        let emoji = '';
        let message = '';
        
        switch(status) {
            case 'Pending':
                emoji = '⏳';
                message = `${emoji} *NAMMA CLINIC - Appointment Booked*

Hello ${name}! 👋

Your appointment has been successfully booked:

📅 *Date:* ${date}
🕐 *Time:* ${time}
👨⚕️ *Doctor:* Dr. PRABHU CHANDRA N.M

⏳ *Status:* Pending Confirmation

📍 *Address:*
97, 4th Main Rd, Vijayanagar
Bengaluru - 560072

📞 *Contact:* +91 9448049152

Thank you for choosing Namma Clinic! 🏥`;
                break;
                
            case 'Confirmed':
                emoji = '✅';
                message = `${emoji} *NAMMA CLINIC - Appointment Confirmed*

Hello ${name}! 👋

Great news! Your appointment is *CONFIRMED* ✅

📅 *Date:* ${date}
🕐 *Time:* ${time}
👨⚕️ *Doctor:* Dr. PRABHU CHANDRA N.M

📍 *Location:*
Namma Clinic, Vijayanagar
Bengaluru - 560072

⏰ Please arrive 15 minutes early

See you soon! 🏥`;
                break;
                
            case 'Cancelled':
                emoji = '❌';
                message = `${emoji} *NAMMA CLINIC - Appointment Cancelled*

Hello ${name}! 👋

Your appointment on ${date} at ${time} has been cancelled.

To book a new appointment:
🌐 Visit: https://namma-clinic.onrender.com
📞 Call: +91 9448049152

We apologize for any inconvenience.

Thank you! 🏥`;
                break;
        }
        
        return message;
    }
}

module.exports = WhatsAppService;