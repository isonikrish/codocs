const axios = require('axios');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '.env') }); // Ensure .env is correctly loaded
const API_KEY = process.env.HUGGING_FACE_API_KEY; // Load API Key from .env file

async function generateDocumentation(codeContent) {
    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B',
            {
                inputs: `Generate documentation for the following code:\n${codeContent}`,
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Log the full response to inspect structure
        console.log('API Response:', response.data);

        // Return generated documentation (adjust if needed based on response structure)
        return response.data.generated_text;
    } catch (error) {
        // Log and handle errors properly
        console.error('Error generating documentation:', error.response?.data?.error || error.message);
        throw error;
    }
}

module.exports = {
    generateDocumentation
};
