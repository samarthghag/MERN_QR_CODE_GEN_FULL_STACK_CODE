import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import About from './about';
import QRGenerator from './components/QRGenerator';
import History from './components/History';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <ul>
            <li><Link to="/">QR Generator</Link></li>
            <li><Link to="/history">History</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<QRGenerator />} />
            <Route path="/history" element={<History />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
