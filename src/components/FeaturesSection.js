import React from 'react';
import FeatureCard from './FeatureCard';

function FeaturesSection() {
  const features = [
    {
      title: "ATS Optimization",
      description: "Ensure your resume passes Applicant Tracking Systems with flying colors.",
      icon: "⚡" // Emoji icon
    },
    {
      title: "Content Enhancement",
      description: "Get smart suggestions to make your experiences shine and impactful.",
      icon: "✨"
    },
    {
      title: "Keyword Matching",
      description: "Align your resume with job descriptions to stand out to recruiters.",
      icon: "🔍"
    },
    {
      title: "LinkedIn Synergy",
      description: "Receive tailored advice to optimize your LinkedIn profile for career growth.",
      icon: "🔗"
    }
  ];

  return (
    <section id="features" className="text-center py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg mb-12 w-full"> {/* Removed max-w-6xl, added w-full for similar width to HeroSection */}
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10 leading-tight">
        Why Choose AI Resume Pro?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"> {/* Internal card container retains max-width */}
        {features.map((feature, index) => (
          <FeatureCard key={index} title={feature.title} description={feature.description} icon={feature.icon} />
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;
