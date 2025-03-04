import React, { useState, useEffect } from 'react';
import api from '../services/api';

function History() {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setIsLoading(true);
                const data = await api.getHistory();
                setHistory(data);
                setIsLoading(false);
            } catch (err) {
                setError('Failed to load history');
                setIsLoading(false);
                console.error(err);
            }
        };

        fetchHistory();
    }, []);

    const handleDownload = (qrCode) => {
        const link = document.createElement('a');
        link.href = qrCode;
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (isLoading) return <div>Loading history...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="history-container">
            <h1>QR Code History</h1>
            {history.length === 0 ? (
                <p>No QR codes have been generated yet.</p>
            ) : (
                <div className="history-list">
                    {history.map((item, index) => (
                        <div key={index} className="history-item">
                            <img src={item.qrCode} alt="QR Code" />
                            <p>URL: {item.link}</p>
                            <button onClick={() => handleDownload(item.qrCode)}>Download</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default History;
