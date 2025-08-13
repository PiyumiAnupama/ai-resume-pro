import React from 'react';

function ReviewDisplay({ review }) {
  if (!review) {
    return null;
  }

  // Helper to render lists
  const renderList = (items) => (
    // Changed list-inside to list-outside and added pl-5 for left alignment visually
    <ul className="list-disc list-outside space-y-1 text-gray-700 pl-5">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-3 mb-6">
        Resume Review Results
      </h2>

      {/* ATS Friendliness */}
      <div className="bg-blue-50 p-6 rounded-lg shadow-md text-left"> {/* Added text-left for content */}
        <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
          ATS Friendliness <span className="ml-3 text-3xl font-extrabold text-blue-800">{review.ats_friendliness.score}%</span>
        </h3>
        <p className="text-lg text-gray-800 mb-3">
          Your resume's ATS score indicates its compatibility with Applicant Tracking Systems.
        </p>
        <h4 className="text-xl font-medium text-blue-600 mb-2">Suggestions:</h4>
        {renderList(review.ats_friendliness.suggestions)}
      </div>

      {/* Improvements */}
      <div className="bg-green-50 p-6 rounded-lg shadow-md text-left"> {/* Added text-left */}
        <h3 className="text-2xl font-semibold text-green-700 mb-4">
          Suggestions for Improvement
        </h3>
        {renderList(review.improvements)}
      </div>

      {/* Mistakes */}
      <div className="bg-red-50 p-6 rounded-lg shadow-md text-left"> {/* Added text-left */}
        <h3 className="text-2xl font-semibold text-red-700 mb-4">
          Identified Mistakes
        </h3>
        {renderList(review.mistakes)}
      </div>

      {/* Keyword Suitability */}
      <div className="bg-purple-50 p-6 rounded-lg shadow-md text-left"> {/* Added text-left */}
        <h3 className="text-2xl font-semibold text-purple-700 mb-4">
          Keyword Suitability
        </h3>
        <p className="text-gray-800 mb-3 pl-5"> {/* Added pl-5 here as well for consistency */}
          <span className="font-semibold">Explanation:</span> {review.keyword_suitability.explanation}
        </p>
        <h4 className="text-xl font-medium text-purple-600 mb-2">Suggested Keywords:</h4>
        <div className="flex flex-wrap gap-2 pl-5"> {/* Added pl-5 */}
          {review.keyword_suitability.suggested_keywords.map((keyword, index) => (
            <span
              key={index}
              className="bg-purple-200 text-purple-800 text-sm font-medium px-3 py-1 rounded-full shadow-sm"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* LinkedIn Optimization */}
      <div className="bg-yellow-50 p-6 rounded-lg shadow-md text-left"> {/* Added text-left */}
        <h3 className="text-2xl font-semibold text-yellow-700 mb-4">
          LinkedIn Optimization Suggestions
        </h3>
        {renderList(review.linkedin_optimization)}
      </div>
    </div>
  );
}

export default ReviewDisplay;
