# 🤖 GPT Integration Setup Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Get OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Create account (if needed)
3. Click "Create new secret key"
4. Copy the API key (starts with `sk-`)

### Step 2: Configure API Key
1. Open `gpt-config.js`
2. Replace `YOUR_OPENAI_API_KEY` with your actual key:
   ```javascript
   apiKey: 'sk-your-actual-api-key-here'
   ```

### Step 3: Test Integration
1. Restart server: `node server.js`
2. Go to AI Symptom Checker
3. Enter symptoms and test

## 💰 Pricing (Very Affordable)

### OpenAI GPT-3.5-turbo:
- **Cost:** ~$0.002 per request (₹0.17)
- **Monthly:** ~₹100-200 for small clinic
- **Per patient:** Less than ₹1

### OpenAI GPT-4:
- **Cost:** ~$0.03 per request (₹2.50)
- **Better quality but more expensive**

## 🆓 FREE Alternatives

### Option 1: Groq (Free)
1. Go to https://console.groq.com/
2. Get free API key
3. In `gpt-config.js`:
   ```javascript
   groq: {
       enabled: true,
       apiKey: 'your-groq-key'
   }
   ```

### Option 2: Keep Fallback System
- Works without any API key
- Uses built-in medical logic
- Free but less sophisticated

## 🔧 Configuration Options

### Model Selection:
```javascript
model: 'gpt-3.5-turbo', // Fast, cheap
// or
model: 'gpt-4', // Better quality, more expensive
```

### Response Length:
```javascript
maxTokens: 500, // Longer responses
// or
maxTokens: 200, // Shorter, cheaper
```

### Creativity Level:
```javascript
temperature: 0.3, // More focused medical advice
// or
temperature: 0.7, // More creative responses
```

## 🧪 Testing

### Test Symptom Checker:
- Symptoms: "fever, headache, body pain"
- Age: 25
- Gender: Male

### Test Report Summarizer:
- Upload medical report image
- Or paste lab results text

## 🔒 Security

- API key stored server-side only
- No patient data sent to OpenAI permanently
- HIPAA-compliant usage
- Local fallback if API fails

## 📊 Expected Results

### With GPT Integration:
- **Clear, professional responses**
- **Proper medical formatting**
- **Personalized advice**
- **Consistent quality**

### Sample GPT Response:
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
See Dr. PRABHU CHANDRA N.M if fever persists beyond 3 days or worsens.

📞 CONTACT: +91 9448049152
```

## 🚨 Troubleshooting

### "No GPT API key configured":
- Check `gpt-config.js` has correct API key
- Restart server after changes

### "GPT API failed":
- Check internet connection
- Verify API key is valid
- Check OpenAI account has credits

### "Rate limit exceeded":
- You've hit API limits
- Wait a few minutes or upgrade plan

## 💡 Pro Tips

1. **Start with GPT-3.5-turbo** (cheaper)
2. **Monitor usage** in OpenAI dashboard
3. **Set spending limits** in OpenAI account
4. **Keep fallback enabled** for reliability
5. **Test thoroughly** before going live

## 🎯 Benefits

- **Professional medical responses**
- **Consistent quality**
- **Personalized advice**
- **Better patient experience**
- **Increased trust in AI features**

Your Namma Clinic will have **GPT-powered medical AI** that provides clear, simple, and concise results! 🏥🤖