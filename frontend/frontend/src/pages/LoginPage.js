import React, { useState, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(isSignup ? 'Sign up submitted!' : 'Login submitted!');
    navigate('/verify');
  };

  const handleSocialSignup = (platform) => {
    alert(`${platform} signup (system saved credentials shown)`);
  };

  return (
    <div
      className={`container ${darkMode ? 'dark-mode' : ''}`}
      style={{
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'Segoe UI, sans-serif',
        background: darkMode ? '#121212' : '#f5f5f5',
        color: darkMode ? '#fff' : '#333',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Dark Mode Button at Top Right */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '18px',
          color: darkMode ? '#fff' : '#333',
        }}
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>

      {/* Centered Login/Signup Form */}
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          background: darkMode ? '#1e1e1e' : '#fff',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: darkMode
            ? '0 0 10px rgba(255, 255, 255, 0.1)'
            : '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          {isSignup ? 'Sign Up' : 'Login'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {isSignup && (
            <input
              type="text"
              placeholder="Name"
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            required
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input
            type="password"
            placeholder="Password"
            required
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <button
            type="submit"
            style={{
              padding: '12px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <button
            onClick={() => setIsSignup(!isSignup)}
            style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}
          >
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </button>
        </div>

        {isSignup && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p>Or sign up with:</p>
            {['Google', 'GitHub', 'Facebook'].map((platform) => (
              <button
                key={platform}
                onClick={() => handleSocialSignup(platform)}
                style={{
                  margin: '5px',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  cursor: 'pointer',
                }}
              >
                {platform}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
