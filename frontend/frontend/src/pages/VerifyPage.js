import React, { useContext, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import axios from 'axios';

const VerifyPage = () => {
  const { darkMode } = useContext(ThemeContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setAnalysisData(null);
    setErrorMsg('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setErrorMsg('Please select a PDF file first.');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg('');
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('http://localhost:5000/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setAnalysisData(response.data);
    } catch (error) {
      console.error('Upload error:', error);
      setErrorMsg('🚫 Error analyzing PDF. Please try again later.');
      setAnalysisData(null);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setAnalysisData(null);
    setErrorMsg('');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: darkMode ? '#121212' : '#f0f2f5',
        color: darkMode ? '#fff' : '#333',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Segoe UI, sans-serif',
        padding: '20px',
      }}
    >
      <div
        style={{
          background: darkMode ? '#1e1e1e' : '#fff',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: darkMode
            ? '0 0 20px rgba(255, 255, 255, 0.1)'
            : '0 4px 20px rgba(0, 0, 0, 0.1)',
          maxWidth: '550px',
          width: '100%',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>📄 Upload Offer Letter PDF</h2>
        
        <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              background: darkMode ? '#333' : '#fff',
              color: darkMode ? '#fff' : '#333',
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px',
              backgroundColor: loading ? '#888' : '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
            }}
          >
            {loading ? 'Analyzing... ⏳' : 'Analyze Offer Letter'}
          </button>

          {selectedFile && (
            <button
              type="button"
              onClick={resetForm}
              style={{
                padding: '10px',
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Reset & Upload Another
            </button>
          )}
        </form>

        {selectedFile && !loading && (
          <p style={{ marginTop: '15px', textAlign: 'center', fontSize: '14px' }}>
            📎 Selected file: <strong>{selectedFile.name}</strong>
          </p>
        )}

        {errorMsg && (
          <p style={{ marginTop: '20px', textAlign: 'center', color: '#ff4d4f' }}>{errorMsg}</p>
        )}

        {analysisData && (
          <div
            style={{
              marginTop: '25px',
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: darkMode ? '#2a2a2a' : '#f9f9f9',
              color: darkMode ? '#fff' : '#333',
              wordBreak: 'break-word',
            }}
          >
            <h3 style={{ marginBottom: '10px', color: darkMode ? '#00e676' : '#28a745' }}>
              ✅ Analysis Result
            </h3>
            <p><strong>Verdict:</strong> {analysisData.verdict}</p>

            {analysisData.issues?.length > 0 && (
              <div style={{ marginTop: '10px' }}>
                <strong>Detected Issues:</strong>
                <ul>
                  {analysisData.issues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyPage;
