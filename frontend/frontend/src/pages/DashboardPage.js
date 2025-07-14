import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Dashboard</h2>
      <p>Welcome! Choose an option below:</p>
      <Link to="/verify">
        <button>Verify Offer Letter</button>
      </Link>
    </div>
  );
};

export default DashboardPage;
