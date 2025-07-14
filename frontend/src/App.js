import React, { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setIssues([]);
    setError("");
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError("");
    setResult(null);
    setIssues([]);

    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Something went wrong while analyzing.");
        setLoading(false);
        return;
      }

      const data = await response.json();
      setResult(data.verdict);
      setIssues(data.issues || []);
    } catch (err) {
      setError("Failed to connect to backend. Please check if Flask server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Fake Offer Letter Detector</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div>
          <h2>Verdict: {result}</h2>
          {issues.length > 0 && (
            <>
              <h3>Issues:</h3>
              <ul>
                {issues.map((issue, index) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
