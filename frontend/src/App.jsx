import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import About from './pages/About';
import Pro from './pages/Pro';
import PrivacyPolicy from './pages/PrivacyPolicy';
import './styles/extension.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App min-h-screen bg-gray-50 dark:bg-gray-900">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/about" element={<About />} />
              <Route path="/pro" element={<Pro />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;