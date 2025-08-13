import React from 'react';
import ResumeUpload from './ResumeUpload'; // Import ResumeUpload
import ReviewDisplay from './ReviewDisplay'; // Import ReviewDisplay
import ScoreChart from './ScoreChart'; // Import ScoreChart

function HeroSection({ onSubmit, loading, error, reviewResult, atsScore }) {
  return (
    <section className="text-center py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg mb-12">
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
        Elevate Your Career with <span className="text-blue-700">AI Resume Pro</span>
      </h1>
      <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
        Unlock your potential with an intelligent resume reviewer that provides instant, actionable feedback to help you land your dream job.
      </p>

      {/* Resume Upload Form now integrated into Hero Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8 md:p-10 border border-gray-200 mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center border-b-2 border-blue-500 pb-4">
          Get Your Resume Reviewed
        </h2>
        <ResumeUpload onSubmit={onSubmit} loading={loading} />

        {loading && (
          <div className="mt-8 p-4 text-center text-blue-600 font-semibold text-lg bg-blue-50 rounded-lg shadow-sm">
            Analyzing your resume... Please wait.
          </div>
        )}

        {error && (
          <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {reviewResult && (
          <div className="mt-10">
            <h3 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-3 mb-6 text-center">
              Your Review Summary
            </h3>
            {/* Score Chart */}
            {atsScore !== undefined && (
              <div className="mb-10 p-6 bg-white rounded-lg shadow-lg border border-gray-100">
                <h4 className="text-2xl font-semibold text-blue-700 mb-4 text-center">
                  ATS Friendliness Score
                </h4>
                <div className="flex justify-center items-center">
                   <ScoreChart score={atsScore} />
                </div>
                <p className="text-center text-gray-600 mt-4">
                  This score indicates how well your resume is optimized for Applicant Tracking Systems.
                </p>
              </div>
            )}
            <ReviewDisplay review={reviewResult} />
          </div>
        )}
      </div>
      
      {/* Feature cards are now exclusively in FeaturesSection.js (the separate component below) */}
    </section>
  );
}

export default HeroSection;
