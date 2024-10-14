const axios = require('axios');
const path = require('path');
const dotenv = require('dotenv').config(); // Ensure .env is correctly loaded
const API_KEY = process.env.API_KEY; // Load API Key from .env file

async function generateDocumentation(codeContent) {
    try {
        const response = await axios.post(
            'https://infinite-gpt.p.rapidapi.com/infinite-gpt', // This includes the endpoint
            {
                query: `Generate a document for this code: ${codeContent}`, 
                sysMsg: "You are a friendly chatbot."
            },
            {
                headers: {
                    'X-Rapidapi-Host': 'infinite-gpt.p.rapidapi.com',
                    'X-Rapidapi-Key': API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        // Log the full response to inspect structure
        console.log('API Response:', response.data);
        
        // Check if the generated text is in the expected format
        if (response.data && response.data.generated_text) {
            return response.data.generated_text; // Return the generated text if present
        } else {
            // Convert the whole response object to a string if no generated_text
            return JSON.stringify(response.data, null, 2); // Convert object to a pretty-printed JSON string
        }
    } catch (error) {
        // Log and handle errors properly
        console.error('Error generating documentation:', error.response?.data?.error || error.message);
        throw error;
    }
}

module.exports = {
    generateDocumentation
};
