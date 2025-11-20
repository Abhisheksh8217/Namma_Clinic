// OCR Service for extracting text from images and PDFs
const fs = require('fs');
const path = require('path');

class OCRService {
    constructor() {
        // Using Tesseract.js for free OCR (client-side) or Google Vision API
        this.tesseractCDN = 'https://unpkg.com/tesseract.js@v2.1.0/dist/tesseract.min.js';
    }

    // Extract text from uploaded file
    async extractTextFromFile(filePath, fileType) {
        try {
            if (fileType.startsWith('image/')) {
                return await this.extractTextFromImage(filePath);
            } else if (fileType === 'application/pdf') {
                return await this.extractTextFromPDF(filePath);
            } else {
                throw new Error('Unsupported file type');
            }
        } catch (error) {
            console.error('OCR extraction error:', error);
            return {
                success: false,
                error: 'Failed to extract text from file'
            };
        }
    }

    // Extract text from image using fallback method
    async extractTextFromImage(imagePath) {
        // This is a server-side fallback - in production, use Tesseract.js on client-side
        // or Google Vision API for better accuracy
        
        // For now, return a mock response indicating client-side processing needed
        return {
            success: true,
            text: 'CLIENT_SIDE_OCR_NEEDED',
            method: 'client-side'
        };
    }

    // Extract text from PDF
    async extractTextFromPDF(pdfPath) {
        // For PDF text extraction, you'd typically use pdf-parse or similar
        // For now, return indication that PDF processing is needed
        return {
            success: true,
            text: 'PDF_PROCESSING_NEEDED',
            method: 'pdf-extract'
        };
    }

    // Generate client-side OCR HTML
    getClientSideOCRScript() {
        return `
        <script src="https://unpkg.com/tesseract.js@v2.1.0/dist/tesseract.min.js"></script>
        <script>
        async function processImageWithOCR(file) {
            const progressDiv = document.getElementById('ocr-progress');
            const resultDiv = document.getElementById('report-summary-content');
            
            progressDiv.innerHTML = '<div style="text-align: center; padding: 2rem;"><i class="fas fa-eye fa-spin" style="font-size: 2rem; color: var(--primary-color);"></i><br><br>Reading text from image...</div>';
            
            try {
                const { data: { text } } = await Tesseract.recognize(file, 'eng', {
                    logger: m => {
                        if (m.status === 'recognizing text') {
                            const progress = Math.round(m.progress * 100);
                            progressDiv.innerHTML = '<div style="text-align: center; padding: 2rem;"><i class="fas fa-eye fa-spin" style="font-size: 2rem; color: var(--primary-color);"></i><br><br>Reading text: ' + progress + '%</div>';
                        }
                    }
                });
                
                if (text && text.trim().length > 10) {
                    progressDiv.innerHTML = '<div style="text-align: center; padding: 1rem; color: var(--success-color);"><i class="fas fa-check-circle"></i> Text extracted successfully!</div>';
                    
                    // Now summarize the extracted text
                    await summarizeExtractedText(text);
                } else {
                    progressDiv.innerHTML = '<div style="color: var(--danger-color); padding: 1rem;"><i class="fas fa-exclamation-triangle"></i> Could not extract readable text from image. Please try a clearer image or type the text manually.</div>';
                }
            } catch (error) {
                console.error('OCR Error:', error);
                progressDiv.innerHTML = '<div style="color: var(--danger-color); padding: 1rem;"><i class="fas fa-times-circle"></i> Error processing image. Please try again or type the text manually.</div>';
            }
        }
        
        async function summarizeExtractedText(extractedText) {
            const resultDiv = document.getElementById('report-summary-content');
            resultDiv.innerHTML = '<div style="text-align: center; padding: 2rem;"><i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--success-color);"></i><br><br>Generating summary...</div>';
            
            try {
                const response = await fetch('/api/summarize-report', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ reportText: extractedText })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    resultDiv.innerHTML = '<pre style="white-space: pre-wrap; font-family: inherit;">' + result.summary + '</pre>';
                } else {
                    resultDiv.innerHTML = '<p style="color: var(--danger-color);">Error generating summary. Please try again.</p>';
                }
            } catch (error) {
                console.error('Summary error:', error);
                resultDiv.innerHTML = '<p style="color: var(--danger-color);">Network error. Please check your connection.</p>';
            }
        }
        </script>
        `;
    }
}

module.exports = OCRService;