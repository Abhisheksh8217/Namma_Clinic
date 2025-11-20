# 🆓 FREE AI Setup Guide - Groq API

## 🚀 Get FREE AI in 2 Minutes!

### Step 1: Get Groq API Key (FREE)
1. Go to https://console.groq.com/
2. Sign up with email (free account)
3. Go to "API Keys" section
4. Click "Create API Key"
5. Copy the key (starts with `gsk_`)

### Step 2: Configure Groq
1. Open `gpt-config.js`
2. Replace `YOUR_GROQ_API_KEY` with your key:
   ```javascript
   groq: {
       enabled: true,
       apiKey: 'gsk_your-actual-groq-key-here'
   }
   ```

### Step 3: Test FREE AI
1. Restart server: `node server.js`
2. Test AI Symptom Checker
3. Test Report Summarizer

## 🆓 Why Groq is Better for Small Clinics:

### ✅ Groq Advantages:
- **100% FREE** - No charges ever
- **Fast responses** - Faster than OpenAI
- **Good quality** - Llama3 model
- **No credit card** required
- **High rate limits** - 30 requests/minute

### 💰 OpenAI Comparison:
- **Paid** - $0.002 per request
- **Credit card required**
- **Monthly bills**
- **Rate limits** on free tier

## 🔧 Current Configuration:

Your system now uses **Groq by default** (free):
```javascript
groq: {
    enabled: true, // FREE AI enabled
    model: 'llama3-8b-8192' // Fast, smart model
}
```

## 🧪 Test Results:

### Sample Groq Response:
```
🔍 POSSIBLE CONDITIONS:
• Viral fever (most likely)
• Common cold
• Early flu symptoms

⚠️ SEVERITY: Medium

📋 WHAT TO DO:
• Rest and stay hydrated
• Monitor temperature
• Take paracetamol if needed

👨⚕️ RECOMMENDATION:
See Dr. PRABHU CHANDRA N.M if fever persists beyond 3 days

📞 CONTACT: +91 9448049152
```

## 🔄 Fallback System:

If Groq fails → Built-in medical logic works
- **Always works** even without internet
- **No API dependency**
- **Reliable backup**

## 🎯 Perfect Setup for Namma Clinic:

1. **Primary:** Groq API (FREE, fast)
2. **Backup:** Built-in fallback (always works)
3. **Future:** Add OpenAI if needed (paid, premium)

## 🚨 Troubleshooting:

### "No Groq API key configured":
- Check `gpt-config.js` has correct key
- Restart server after changes

### "Groq API failed":
- Check internet connection
- Verify API key is valid
- System will use fallback automatically

## 💡 Pro Tips:

1. **Start with Groq** (free, good quality)
2. **Keep fallback enabled** (reliability)
3. **Monitor usage** in Groq console
4. **Upgrade to OpenAI** only if needed

Your Namma Clinic now has **FREE AI** that works as well as paid alternatives! 🎉

// groq API key :  "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"