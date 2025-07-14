import React, { useState } from "react";
import axios from "axios";

function VerifyPage() {
  const [file, setFile] = useState(null);
  const [verdict, setVerdict] = useState("");
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setVerdict("");
    setIssues([]);
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setVerdict(response.data.verdict);
      setIssues(response.data.issues || []);
    } catch (error) {
      console.error("Error analyzing file:", error);
      setVerdict("Something went wrong while analyzing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-page">
      <h2>Verify Your Offer Letter</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {verdict && (
        <div className="result">
          <h3>Verdict: <span className={verdict.includes("Fake") ? "fake" : "genuine"}>{verdict}</span></h3>
          {issues.length > 0 && (
            <>
              <h4>Issues Found:</h4>
              <ul>
                {issues.map((issue, idx) => (
                  <li key={idx}>{issue}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default VerifyPage;
