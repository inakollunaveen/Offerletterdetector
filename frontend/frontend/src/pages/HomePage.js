import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';

const features = [
  'AI-powered PDF analysis',
  'Suspicious keyword scanning',
  'Grammar & consistency checks',
  'Privacy-first document processing',
  'Instant verdict & explanation',
];

const alerts = [
  "🚨 Fake job offers rising globally — stay vigilant!",
  "🛡️ New AI model update: Accuracy boosted!",
  "⚡ Fastest verification ever now live!",
];

const HomePage = () => {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [currentAlert, setCurrentAlert] = useState(0);
  const [letterCount, setLetterCount] = useState(0);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      if (count < 8420) {
        count += Math.floor(Math.random() * 20) + 5;
        setLetterCount(count);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const alertInterval = setInterval(() => {
      setCurrentAlert((prev) => (prev + 1) % alerts.length);
    }, 5000);
    return () => clearInterval(alertInterval);
  }, []);

  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`} style={{ padding: '40px', fontFamily: 'Segoe UI, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>🕵️ Fake Offer Letter Detector</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      <div
        style={{
          backgroundColor: '#ffefc5',
          padding: '10px',
          marginTop: '20px',
          borderRadius: '6px',
          textAlign: 'center',
          fontWeight: 'bold'
        }}
      >
        {alerts[currentAlert]}
      </div>

      <p style={{ textAlign: 'center', color: '#555', margin: '20px 0', fontSize: '18px' }}>
        Protect your future with <strong>AI-certified offer letters</strong>.
      </p>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={() => navigate('/login')}
          style={{
            padding: '12px 30px',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </div>

      <section style={{ marginTop: '50px' }}>
        <h2 style={{ textAlign: 'center' }}>Platform Features</h2>
        <ul style={{ listStyle: 'none', padding: 0, maxWidth: '600px', margin: '20px auto', textAlign: 'left' }}>
          {features.map((item, index) => (
            <li
              key={index}
              style={{
                marginBottom: '12px',
                background: darkMode ? '#1e1e1e' : '#f9f9f9',
                padding: '10px',
                borderRadius: '6px'
              }}
            >
              ✅ {item}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: '40px' }}>
        <h2>Our Growth</h2>
        <progress value={letterCount % 10000} max="10000" style={{ width: '100%' }} />
        <h3>🎯 {letterCount}+ letters analyzed</h3>
      </section>

      <section style={{ marginTop: '40px' }}>
        <h2>FAQs</h2>
        <details>
          <summary>Is my document secure?</summary>
          <p>Yes! All uploads are deleted immediately after analysis.</p>
        </details>
        <details>
          <summary>How accurate is it?</summary>
          <p>Our AI model is updated continuously to maintain high accuracy.</p>
        </details>
        <details>
          <summary>Can I analyze multiple letters?</summary>
          <p>Yes! Upload and analyze as many as you like.</p>
        </details>
      </section>

      <footer style={{ marginTop: '50px', textAlign: 'center', fontSize: '14px', color: '#999' }}>
        &copy; {new Date().getFullYear()} Fake Offer Letter Detector. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
