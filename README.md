# MERN QR Code Generator Project

A full-stack application that allows users to generate QR codes from URLs and view their generation history.

## Features

- Generate QR codes from any URL
- View history of generated QR codes
- Download QR codes as images
- Responsive design for desktop and mobile devices

## Tech Stack

- **Frontend**: React.js, React Router, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **QR Generation**: qrcode.js library

## Project Structure

```
mern-QR-full-stack-project/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── QRGenerator.js
│       │   └── History.js
│       ├── services/
│       │   └── api.js
│       ├── App.js
│       ├── App.css
│       ├── about.js
│       ├── home.js
│       └── index.css
│
├── backend/
│   ├── models/
│   │   └── QRCode.js
│   ├── routes/
│   │   └── qrRoutes.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Implementation Guide

### Step 1: Set Up the Project

Create the project structure:

```bash
# Create project folders
mkdir -p mern-QR-full-stack-project/{frontend,backend}

# Initialize backend
cd mern-QR-full-stack-project/backend
npm init -y
npm install express mongoose cors qrcode dotenv

# Initialize frontend
cd ../frontend
npx create-react-app .
npm install react-router-dom
```

### Step 2: Backend Implementation

1. **Create server.js file**

```javascript
// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/qrcode-generator')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/', require('./routes/qrRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

2. **Create QR Code Model**

```javascript
// backend/models/QRCode.js
const mongoose = require('mongoose');

const QRCodeSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true
  },
  qrCode: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('QRCode', QRCodeSchema);
```

3. **Create QR Code Routes**

```javascript
// backend/routes/qrRoutes.js
const express = require('express');
const router = express.Router();
const QRCode = require('../models/QRCode');
const qrcode = require('qrcode');

// Generate QR Code
router.post('/generate', async (req, res) => {
  try {
    const { link } = req.body;
    
    if (!link) {
      return res.status(400).json({ message: 'URL is required' });
    }
    
    // Generate QR code as data URL
    const qrCodeImage = await qrcode.toDataURL(link);
    
    // Save to database
    const newQRCode = new QRCode({
      link,
      qrCode: qrCodeImage
    });
    
    await newQRCode.save();
    
    res.json({ qrCode: qrCodeImage });
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get QR Code History
router.get('/history', async (req, res) => {
  try {
    const history = await QRCode.find().sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
```

### Step 3: Frontend Implementation

The frontend implementation includes the components already provided in your files:

1. API Service
2. QR Generator Component
3. History Component
4. App Component with Routing
5. CSS Styling

### Step 4: Connect Frontend and Backend

Make sure your `api.js` file points to the correct backend URL:

```javascript
const API_URL = 'http://localhost:5000';
```

### Step 5: Run the Application

1. **Start the backend server**:

```bash
cd backend
npm start
```

2. **Start the frontend server**:

```bash
cd frontend
npm start
```

Visit `http://localhost:3000` in your browser to use the application.

## API Endpoints

- **POST /generate**: Generates a QR code from a provided URL
  - Request Body: `{ "link": "https://example.com" }`
  - Response: `{ "qrCode": "data:image/png;base64,..." }`

- **GET /history**: Returns all previously generated QR codes
  - Response: Array of objects with `link`, `qrCode`, and `createdAt` fields

## Additional Customization

You can customize the QR code generation by modifying the `qrcode` options in the backend. For example:

```javascript
qrcode.toDataURL(link, {
  width: 300,
  margin: 2,
  color: {
    dark: '#000000',
    light: '#ffffff'
  }
});
```

## Learning Objectives

Through this project, you will learn:

1. How to build a full-stack MERN application
2. Working with external libraries (qrcode)
3. Implementing file downloads in a browser
4. Building a responsive React UI
5. Handling API requests with async/await in React
6. Managing state in React components
7. Implementing routing with React Router

## Troubleshooting

- **CORS issues**: Make sure your backend has CORS configured correctly
- **Database connection**: Check MongoDB connection string and ensure database is running
- **Image loading**: QR codes are stored as base64 strings, check for any encoding issues

## Future Enhancements

- User authentication
- Custom QR code styling options
- Analytics for QR code usage
- Bulk QR code generation
- Expiry dates for QR codes
