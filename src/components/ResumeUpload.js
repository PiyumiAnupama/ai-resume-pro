import React, { useState } from 'react';

function ResumeUpload({ onSubmit, loading }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    } else {
      setSelectedFile(null);
      setFileName('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      onSubmit(selectedFile, jobDescription);
    } else {
      // You could add a more user-friendly message here, e.g., a modal or toast
      alert('Please select a resume file to upload.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-center"> {/* Added text-center here */}
      <div>
        <label htmlFor="resume-file" className="block text-lg font-medium text-gray-700 mb-2"> {/* Removed text-left */}
          Upload Your Resume (PDF or DOCX):
        </label>
        <div className="flex items-center justify-center space-x-4">
          <input
            id="resume-file"
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="resume-file"
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Choose File
          </label>
          <span className="text-gray-600 text-base">
            {fileName || 'No file chosen'}
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="job-description" className="block text-lg font-medium text-gray-700 mb-2"> {/* Removed text-left */}
          Job Description (Optional, for keyword analysis):
        </label>
        <textarea
          id="job-description"
          rows="5"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here for more tailored keyword suggestions..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200 ease-in-out text-gray-800"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={!selectedFile || loading}
        className={`w-full py-3 px-6 rounded-lg font-bold text-white transition duration-300 ease-in-out transform ${
          !selectedFile || loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 shadow-lg hover:scale-105'
        }`}
      >
        {loading ? 'Reviewing...' : 'Review My Resume'}
      </button>
    </form>
  );
}

export default ResumeUpload;
