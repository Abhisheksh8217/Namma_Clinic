// AI Medical Service for Symptom Checker and Report Summary
const gptConfig = require('./gpt-config');
const fetch = require('node-fetch');

class AIMedicalService {
    constructor() {
        this.config = gptConfig;
        
        // Check which API to use (Groq or OpenAI)
        if (gptConfig.groq.enabled && gptConfig.groq.apiKey !== 'YOUR_GROQ_API_KEY') {
            this.apiKey = gptConfig.groq.apiKey;
            this.baseUrl = gptConfig.groq.baseUrl;
            this.model = gptConfig.groq.model;
            this.provider = 'Groq';
        } else {
            this.apiKey = gptConfig.openai.apiKey;
            this.baseUrl = gptConfig.openai.baseUrl;
            this.model = gptConfig.openai.model;
            this.provider = 'OpenAI';
        }
    }

    // AI Symptom Checker with GPT
    async checkSymptoms(symptoms, age, gender) {
        // Create prompt from template
        const prompt = this.config.prompts.symptomChecker
            .replace('{age}', age)
            .replace('{gender}', gender)
            .replace('{symptoms}', symptoms);

        try {
            // Check if any API key is configured
            if (!this.apiKey || this.apiKey === 'YOUR_OPENAI_API_KEY' || this.apiKey === 'YOUR_GROQ_API_KEY') {
                console.log(`No ${this.provider} API key configured, using fallback`);
                return this.fallbackSymptomChecker(symptoms, age, gender);
            }
            
            console.log(`Using ${this.provider} API for symptom analysis`);
            console.log('API Key:', this.apiKey ? 'Configured' : 'Missing');
            console.log('Provider:', this.provider);

            // Try AI API (OpenAI or Groq)
            const requestBody = {
                model: this.model,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful medical AI assistant for Namma Clinic. Provide clear, simple, and concise medical guidance.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: this.provider === 'Groq' ? 1000 : this.config.openai.maxTokens,
                temperature: this.config.openai.temperature
            };
            
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('✅ Groq API Success - Symptom Analysis');
                return {
                    success: true,
                    analysis: data.choices[0].message.content.trim(),
                    source: this.provider + '-' + this.model,
                    tokens_used: data.usage?.total_tokens || 0,
                    provider: this.provider
                };
            } else {
                const errorData = await response.json();
                console.error(`${this.provider} API Error:`, errorData);
                throw new Error(`${this.provider} API failed: ${response.status}`);
            }
        } catch (error) {
            console.error(`${this.provider} Error:`, error.message);
            console.error('Full error:', error);
            // Fallback to rule-based system
            console.log('Falling back to rule-based system');
            return this.fallbackSymptomChecker(symptoms, age, gender);
        }
    }

    // Medical Report Summarizer with GPT
    async summarizeReport(reportText) {
        // Create prompt from template
        const prompt = this.config.prompts.reportSummarizer
            .replace('{reportText}', reportText);

        try {
            // Check if any API key is configured
            if (!this.apiKey || this.apiKey === 'YOUR_OPENAI_API_KEY' || this.apiKey === 'YOUR_GROQ_API_KEY') {
                console.log(`No ${this.provider} API key configured, using fallback`);
                return this.fallbackReportSummary(reportText);
            }
            
            console.log(`Using ${this.provider} API for report summary`);
            console.log('API Key:', this.apiKey ? 'Configured' : 'Missing');
            console.log('Provider:', this.provider);

            // Try AI API (OpenAI or Groq)
            const requestBody = {
                model: this.model,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a medical AI assistant helping patients understand their medical reports. Use simple language and avoid medical jargon.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: this.provider === 'Groq' ? 1000 : this.config.openai.maxTokens,
                temperature: this.config.openai.temperature
            };
            
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                const data = await response.json();
                return {
                    success: true,
                    summary: data.choices[0].message.content.trim(),
                    source: this.provider + '-' + this.model,
                    tokens_used: data.usage?.total_tokens || 0,
                    provider: this.provider
                };
            } else {
                const errorData = await response.json();
                console.error(`${this.provider} API Error:`, errorData);
                throw new Error(`${this.provider} API failed: ${response.status}`);
            }
        } catch (error) {
            console.error(`${this.provider} Error:`, error.message);
            // Fallback to basic text processing
            return this.fallbackReportSummary(reportText);
        }
    }

    // Fallback rule-based symptom checker
    fallbackSymptomChecker(symptoms, age, gender) {
        const symptomLower = symptoms.toLowerCase();
        let analysis = '';
        let severity = 'Medium';
        let conditions = [];

        // Common symptom patterns
        if (symptomLower.includes('fever') || symptomLower.includes('temperature')) {
            conditions.push('Viral Infection', 'Bacterial Infection');
            severity = 'Medium';
            analysis = 'Fever indicates your body is fighting an infection. ';
        }

        if (symptomLower.includes('headache') || symptomLower.includes('head pain')) {
            conditions.push('Tension Headache', 'Migraine', 'Dehydration');
            severity = 'Low';
            analysis += 'Headaches can be caused by stress, dehydration, or tension. ';
        }

        if (symptomLower.includes('chest pain') || symptomLower.includes('heart')) {
            conditions.push('Chest Pain - Requires Immediate Attention');
            severity = 'High';
            analysis += '⚠️ Chest pain requires immediate medical attention. ';
        }

        if (symptomLower.includes('stomach') || symptomLower.includes('abdominal')) {
            conditions.push('Gastritis', 'Indigestion', 'Food Poisoning');
            severity = 'Medium';
            analysis += 'Stomach issues may be related to diet or stress. ';
        }

        if (symptomLower.includes('cough') || symptomLower.includes('cold')) {
            conditions.push('Common Cold', 'Upper Respiratory Infection');
            severity = 'Low';
            analysis += 'Respiratory symptoms are common and usually resolve with rest. ';
        }

        // Default response
        if (conditions.length === 0) {
            conditions = ['General Health Consultation Needed'];
            analysis = 'Your symptoms require professional medical evaluation. ';
        }

        const recommendation = severity === 'High' 
            ? 'Seek immediate medical attention. Visit Namma Clinic or call emergency services.'
            : severity === 'Medium'
            ? 'Schedule an appointment with Dr. PRABHU CHANDRA N.M within 1-2 days.'
            : 'Monitor symptoms. If they worsen, consult Dr. PRABHU CHANDRA N.M.';

        return {
            success: true,
            analysis: `${analysis}

🔍 Possible Conditions:
${conditions.map(c => `• ${c}`).join('\n')}

⚠️ Severity: ${severity}

📋 Recommendation:
${recommendation}

👨⚕️ Dr. PRABHU CHANDRA N.M at Namma Clinic can provide proper diagnosis and treatment.
📞 Call: +91 9448049152
📍 Address: 97, 4th Main Rd, Vijayanagar, Bengaluru

⚠️ Disclaimer: This is AI-generated guidance only. Always consult a qualified doctor for proper diagnosis.`,
            source: 'Rule-based Fallback'
        };
    }

    // Fallback report summarizer
    fallbackReportSummary(reportText) {
        const text = reportText.toLowerCase();
        let summary = '📋 Medical Summary:\n\n';
        
        // Check if it's a prescription/medication list
        if (text.includes('mg') || text.includes('tablet') || text.includes('daily') || text.includes('metformin') || text.includes('glimepiride')) {
            summary += '💊 MEDICATIONS PRESCRIBED:\n';
            
            if (text.includes('metformin')) {
                summary += '• Metformin 500mg - Controls blood sugar levels (diabetes medicine)\n';
                summary += '  Take 1 tablet twice daily with food\n';
            }
            
            if (text.includes('glimepiride')) {
                summary += '• Glimepiride 1mg - Helps lower blood sugar (diabetes medicine)\n';
                summary += '  Take 1 tablet once daily before breakfast\n';
            }
            
            if (text.includes('electral')) {
                summary += '• Electral powder - Prevents dehydration, replaces body salts\n';
                summary += '  Mix 1 sachet in 1L water, sip throughout day\n';
            }
            
            if (text.includes('calcium') || text.includes('vitamin d')) {
                summary += '• Calcium + Vitamin D3 - Strengthens bones and teeth\n';
                summary += '  Take 1 tablet daily for 30 days\n';
            }
            
            summary += '\n🎯 PURPOSE:\n';
            summary += '• These medicines help control diabetes\n';
            summary += '• Maintain proper blood sugar levels\n';
            summary += '• Support overall health\n\n';
            
            summary += '⚠️ IMPORTANT INSTRUCTIONS:\n';
            summary += '• Take medicines at the same time daily\n';
            summary += '• Do not skip doses\n';
            summary += '• Take with food as directed\n\n';
        } else {
            // Handle regular medical reports
            const findings = [];
            
            if (text.includes('normal') || text.includes('within normal limits')) {
                findings.push('✅ Most values appear normal');
            }
            
            if (text.includes('abnormal') || text.includes('elevated') || text.includes('high')) {
                findings.push('⚠️ Some values are elevated and need attention');
            }
            
            if (text.includes('blood pressure') || text.includes('bp')) {
                findings.push('🩺 Blood pressure checked');
            }
            
            if (text.includes('diabetes') || text.includes('sugar') || text.includes('glucose')) {
                findings.push('🍯 Blood sugar levels evaluated');
            }
            
            if (text.includes('cholesterol')) {
                findings.push('💓 Cholesterol levels checked');
            }

            if (findings.length > 0) {
                summary += findings.join('\n') + '\n\n';
            }
        }

        summary += `📝 NEXT STEPS:
• Follow the prescribed medication schedule
• Monitor your health regularly
• Book follow-up appointment as needed

👨⚕️ DOCTOR CONSULTATION:
Discuss any questions about medicines with Dr. PRABHU CHANDRA N.M

📞 Contact Namma Clinic: +91 9448049152

⚠️ NOTE: Take medicines exactly as prescribed. Never stop without consulting doctor.`;

        return {
            success: true,
            summary: summary,
            source: 'Enhanced Fallback'
        };
    }
}

module.exports = AIMedicalService;