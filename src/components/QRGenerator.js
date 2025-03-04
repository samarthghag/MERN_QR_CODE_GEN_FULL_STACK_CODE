import React, { useState } from 'react';
import api from '../services/api';

function QRGenerator() {
    const [link, setLink] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const generateQRCode = async (e) => {
        e.preventDefault();
        if (!link) {
            setError('Please enter a URL');
            return;
        }

        try {
            setIsLoading(true);
            setError('');
            const response = await api.generateQRCode(link);
            setQrCode(response.qrCode);
            setIsLoading(false);
        } catch (err) {
            setError('Failed to generate QR code');
            setIsLoading(false);
            console.error(err);
        }
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = qrCode;
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="qr-container">
            <h1>QR Code Generator</h1>
            <form className="qr-form" onSubmit={generateQRCode}>
                <input
                    type="text"
                    placeholder="Enter URL here"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Generating...' : 'Generate QR Code'}
                </button>
            </form>
            
            {error && <div className="error-message">{error}</div>}
            
            {qrCode && (
                <div className="qr-result">
                    <img src={qrCode} alt="QR Code" />
                    <button onClick={handleDownload}>Download QR Code</button>
                </div>
            )}
        </div>
    );
}

export default QRGenerator;
