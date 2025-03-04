const API_URL = 'http://localhost:5000';

const api = {
    generateQRCode: async (link) => {
        const response = await fetch(`${API_URL}/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ link }),
        });
        
        if (!response.ok) {
            throw new Error('Failed to generate QR code');
        }
        
        return response.json();
    },
    
    getHistory: async () => {
        const response = await fetch(`${API_URL}/history`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch history');
        }
        
        return response.json();
    }
};

export default api;
