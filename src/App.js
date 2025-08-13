import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection'; // HeroSection will now contain the upload and review logic
// Removed direct imports for ResumeUpload, ReviewDisplay, ScoreChart as they will be handled by HeroSection
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';

function App() {
  const [reviewResult, setReviewResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleResumeSubmit = async (file, jobDescription) => {
    setLoading(true);
    setError(null);
    setReviewResult(null); // Clear previous results

    const formData = new FormData();
    formData.append('file', file);
    formData.append('job_description', jobDescription);

    try {
      // Replace with your FastAPI backend URL (ensure it's running on http://127.0.0.1:8000)
      const response = await fetch('http://127.0.0.1:8000/review-resume/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to review resume.');
      }

      const data = await response.json();
      setReviewResult(data);
    } catch (err) {
      setError(err.message);
      console.error('Error reviewing resume:', err);
    } finally {
      setLoading(false);
    }
  };

  // Determine ATS score for the chart
  const atsScore = reviewResult?.ats_friendliness?.score;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-inter w-full">
      {/* Top Navigation Bar */}
      <Navbar />

      <main className="flex-grow w-full px-4 py-8">
        {/* Hero Section now contains the resume upload and review display */}
        <HeroSection
          onSubmit={handleResumeSubmit}
          loading={loading}
          error={error}
          reviewResult={reviewResult}
          atsScore={atsScore}
        />

        {/* Features Card Section */}
        <FeaturesSection />
      </main>

      {/* Bottom Navigation Bar / Footer */}
      <Footer />
    </div>
  );
}

export default App;
