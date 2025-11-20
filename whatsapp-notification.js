// FREE WhatsApp Business Notification System
class WhatsAppNotification {
    constructor() {
        this.clinicNumber = '+919448049152'; // Namma Clinic WhatsApp number
        this.businessName = 'Namma Clinic';
    }

    // Generate WhatsApp message for appointment confirmation
    generateAppointmentMessage(patientData) {
        const { name, phone, date, time, status } = patientData;
        
        let message = '';
        let emoji = '';
        
        switch(status) {
            case 'Pending':
                emoji = '⏳';
                message = `${emoji} *NAMMA CLINIC - Appointment Booked*

Hello ${name}! 👋

Your appointment has been successfully booked:

📅 *Date:* ${date}
🕐 *Time:* ${time}
👨⚕️ *Doctor:* Dr. PRABHU CHANDRA N.M
🏥 *Department:* General Medicine

⏳ *Status:* Pending Confirmation
(We will confirm your appointment soon)

📍 *Address:*
97, 4th Main Rd, 2nd Block
Govindaraja Nagar Ward
Canara Bank Colony, Vijayanagar
Bengaluru, Karnataka 560072

📞 *Contact:* +91 9448049152

⚠️ *Important:*
• Arrive 15 minutes early
• Bring valid ID
• Carry previous medical records

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

✅ *Status:* CONFIRMED

📍 *Location:*
Namma Clinic
97, 4th Main Rd, Vijayanagar
Bengaluru - 560072

⏰ *Reminder:*
Please arrive 15 minutes before your appointment time.

📞 Need to reschedule? Call: +91 9448049152

See you soon! 🏥`;
                break;
                
            case 'Rescheduled':
                emoji = '📅';
                message = `${emoji} *NAMMA CLINIC - Appointment Rescheduled*

Hello ${name}! 👋

Your appointment has been rescheduled:

📅 *New Date:* ${date}
🕐 *New Time:* ${time}
👨⚕️ *Doctor:* Dr. PRABHU CHANDRA N.M

📅 *Status:* Rescheduled

Please confirm by replying to this message.

📞 *Contact:* +91 9448049152

Thank you for your understanding! 🏥`;
                break;
                
            case 'Cancelled':
                emoji = '❌';
                message = `${emoji} *NAMMA CLINIC - Appointment Cancelled*

Hello ${name}! 👋

Your appointment on ${date} at ${time} has been cancelled.

❌ *Status:* Cancelled

To book a new appointment:
🌐 Visit: https://namma-clinic.onrender.com
📞 Call: +91 9448049152

We apologize for any inconvenience.

Thank you! 🏥`;
                break;
        }
        
        return message;
    }

    // Generate reminder message
    generateReminderMessage(patientData) {
        const { name, date, time } = patientData;
        
        return `⏰ *NAMMA CLINIC - Appointment Reminder*

Hello ${name}! 👋

This is a reminder for your appointment:

📅 *Tomorrow:* ${date}
🕐 *Time:* ${time}
👨⚕️ *Doctor:* Dr. PRABHU CHANDRA N.M

📍 *Address:*
Namma Clinic
97, 4th Main Rd, Vijayanagar
Bengaluru - 560072

⏰ *Please arrive 15 minutes early*

📞 Need to reschedule? Call: +91 9448049152

See you tomorrow! 🏥`;
    }

    // Create WhatsApp link for easy sending
    createWhatsAppLink(phone, message) {
        // Clean phone number (remove +91, spaces, etc.)
        const cleanPhone = phone.replace(/^\+91/, '').replace(/\D/g, '');
        const fullPhone = `91${cleanPhone}`; // Add country code
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // Create WhatsApp web link
        const whatsappLink = `https://wa.me/${fullPhone}?text=${encodedMessage}`;
        
        return whatsappLink;
    }

    // Generate notification for admin/staff
    generateStaffNotification(patientData, action) {
        const { name, phone, date, time } = patientData;
        
        let message = `🏥 *NAMMA CLINIC - Staff Alert*

📋 *${action.toUpperCase()}*

👤 *Patient:* ${name}
📞 *Phone:* ${phone}
📅 *Date:* ${date}
🕐 *Time:* ${time}

⏰ *Time:* ${new Date().toLocaleString()}

Please take necessary action.`;

        return message;
    }

    // Create broadcast list message
    generateBroadcastMessage(type, data = {}) {
        let message = '';
        
        switch(type) {
            case 'clinic_hours':
                message = `🏥 *NAMMA CLINIC - Working Hours*

📅 *Monday to Saturday:*
🕘 9:00 AM - 4:00 PM

📅 *Sunday:* Closed

🚨 *Emergency:* 24/7 Available
📞 Call: +91 9448049152

👨⚕️ *Dr. PRABHU CHANDRA N.M*
General Physician | 15+ Years Experience

📍 *Address:*
97, 4th Main Rd, Vijayanagar
Bengaluru - 560072`;
                break;
                
            case 'health_tip':
                message = `💡 *NAMMA CLINIC - Daily Health Tip*

${data.tip || 'Stay hydrated! Drink at least 8 glasses of water daily for optimal health.'}

👨⚕️ *From Dr. PRABHU CHANDRA N.M*

📞 Book appointment: +91 9448049152
🏥 Namma Clinic, Vijayanagar`;
                break;
                
            case 'clinic_update':
                message = `📢 *NAMMA CLINIC - Important Update*

${data.update || 'Clinic update message'}

📞 *Contact:* +91 9448049152
🏥 *Namma Clinic*`;
                break;
        }
        
        return message;
    }
}

module.exports = WhatsAppNotification;