// GPT Configuration for AI Medical Features
module.exports = {
    // OpenAI Configuration
    openai: {
        apiKey: 'YOUR_OPENAI_API_KEY', // Get from https://platform.openai.com/api-keys
        baseUrl: 'https://api.openai.com/v1/chat/completions',
        model: 'gpt-3.5-turbo', // or 'gpt-4' for better results
        maxTokens: 500,
        temperature: 0.3 // Lower = more focused, Higher = more creative
    },

    // Alternative: Groq (Free GPT alternative)
    groq: {
        enabled: true, // Set to true to use Groq instead of OpenAI (FREE)
        apiKey: process.env.GROQ_API_KEY, // Get from https://console.groq.com/
        baseUrl: 'https://api.groq.com/openai/v1/chat/completions',
        model: 'llama-3.1-8b-instant'
    },

    // Prompts for different medical tasks
    prompts: {
        symptomChecker: `You are a medical AI assistant for Namma Clinic in Bengaluru. 

Patient Information:
- Age: {age}
- Gender: {gender}
- Symptoms: {symptoms}

Provide a clear, simple response in this format:

🔍 POSSIBLE CONDITIONS:
• [List 2-3 most likely conditions]

⚠️ SEVERITY: [Low/Medium/High]

📋 WHAT TO DO:
• [Immediate actions needed]
• [When to see doctor]

👨‍⚕️ RECOMMENDATION:
[Specific advice about seeing Dr. PRABHU CHANDRA N.M]

📞 CONTACT: +91 9448049152
📍 ADDRESS: 97, 4th Main Rd, Vijayanagar, Bengaluru

⚠️ IMPORTANT: This is AI guidance only. Always consult Dr. PRABHU CHANDRA N.M for proper diagnosis.

Keep response under 200 words, simple language, easy to understand.`,

        reportSummarizer: `You are a medical AI assistant helping patients understand their medical reports.

Medical Report:
{reportText}

Create a simple, easy-to-understand summary in this format:

📋 REPORT SUMMARY:

🔍 KEY FINDINGS:
• [Main findings in simple terms]
• [Important values and what they mean]

📊 TEST RESULTS:
• [Normal/Abnormal results explained simply]

⚠️ WHAT THIS MEANS:
• [Health implications in plain language]

📝 NEXT STEPS:
• [What patient should do]
• [Follow-up needed]

👨‍⚕️ DOCTOR CONSULTATION:
[Why they should discuss with Dr. PRABHU CHANDRA N.M]

📞 CONTACT: +91 9448049152

⚠️ NOTE: This is a simplified explanation. Discuss all details with Dr. PRABHU CHANDRA N.M for complete understanding.

Use simple words, avoid medical jargon, keep under 300 words.`
    }
};

// Setup Instructions:
/*
1. Get OpenAI API Key:
   - Go to https://platform.openai.com/api-keys
   - Create account and get API key
   - Replace 'YOUR_OPENAI_API_KEY' above

2. Alternative - Groq (Free):
   - Go to https://console.groq.com/
   - Get free API key
   - Set groq.enabled = true

3. Install dependency:
   npm install axios

4. Cost (OpenAI):
   - GPT-3.5-turbo: ~$0.002 per request
   - GPT-4: ~$0.03 per request
   - Very affordable for small clinic

5. Free alternatives if no budget:
   - Groq API (free tier)
   - Hugging Face API (free)
   - Keep existing fallback system
*/