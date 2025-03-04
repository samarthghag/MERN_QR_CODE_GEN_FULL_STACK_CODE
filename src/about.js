import React from 'react';

function About() {
    return (
        <div className="about-container">
            <h1>About QR Code Generator</h1>
            <div className="about-content">
                <p>This application allows you to generate QR codes from URLs and stores your history.</p>
                <p>Features:</p>
                <ul>
                    <li>Generate QR codes from any link</li>
                    <li>View your generation history</li>
                    <li>Download generated QR codes</li>
                </ul>
                <p>Built with React, Node.js, Express and MongoDB.</p>
            </div>
        </div>
    );
}

export default About;