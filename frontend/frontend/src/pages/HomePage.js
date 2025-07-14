import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Welcome to Fake Offer Letter Detector</h1>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default HomePage;
