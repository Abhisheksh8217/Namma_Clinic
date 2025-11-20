require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const AIMedicalService = require('./ai-medical-service');
const WhatsAppService = require('./whatsapp-service');

// Initialize services
const aiMedical = new AIMedicalService();
const whatsappService = new WhatsAppService();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Get appointments
app.get('/api/appointments', (req, res) => {
  try {
    const appointmentsPath = path.join(__dirname, 'appointments.json');
    if (fs.existsSync(appointmentsPath)) {
      const data = fs.readFileSync(appointmentsPath, 'utf8');
      const appointments = JSON.parse(data || '{}');
      res.json(appointments);
    } else {
      res.json({});
    }
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch appointments' });
  }
});

// Save appointments
app.post('/api/save-appointments', (req, res) => {
  try {
    const appointments = req.body;
    const appointmentsPath = path.join(__dirname, 'appointments.json');
    fs.writeFileSync(appointmentsPath, JSON.stringify(appointments, null, 2));
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving appointments:', error);
    res.status(500).json({ success: false, error: 'Failed to save appointments' });
  }
});

// AI Symptom Checker API
app.post('/api/check-symptoms', async (req, res) => {
  try {
    const { symptoms, age, gender } = req.body;
    
    if (!symptoms || !age || !gender) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }
    
    const result = await aiMedical.checkSymptoms(symptoms, age, gender);
    res.json(result);
  } catch (error) {
    console.error('Symptom check error:', error);
    res.status(500).json({ success: false, error: 'Failed to analyze symptoms' });
  }
});

// Medical Report Summarizer API
app.post('/api/summarize-report', async (req, res) => {
  try {
    const { reportText } = req.body;
    
    if (!reportText || reportText.trim().length < 10) {
      return res.status(400).json({ success: false, error: 'Report text is required' });
    }
    
    const result = await aiMedical.summarizeReport(reportText);
    res.json(result);
  } catch (error) {
    console.error('Report summary error:', error);
    res.status(500).json({ success: false, error: 'Failed to summarize report' });
  }
});

// WhatsApp Notification API
app.post('/api/send-whatsapp', async (req, res) => {
  try {
    const { phone, name, date, time, status } = req.body;
    
    if (!phone || !name || !date || !time || !status) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }
    
    const result = await whatsappService.sendAppointmentNotification({
      phone, name, date, time, status
    });
    
    res.json(result);
  } catch (error) {
    console.error('WhatsApp send error:', error);
    res.status(500).json({ success: false, error: 'Failed to send WhatsApp message' });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🏥 Namma Clinic Server running on port ${PORT}`);
  console.log('✅ Server is ready!');
});
