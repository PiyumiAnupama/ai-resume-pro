import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis, Text } from 'recharts';

// Custom label component for the RadialBarChart
const CustomLabel = ({ viewBox, value }) => {
  const { cx, cy } = viewBox;
  return (
    <Text
      x={cx}
      y={cy}
      fill="#333"
      textAnchor="middle"
      dominantBaseline="middle"
      className="text-4xl font-extrabold" // Tailwind classes for styling
    >
      {value}%
    </Text>
  );
};

function ScoreChart({ score }) {
  const data = [
    {
      name: 'ATS Score',
      uv: score, // Value for the score
      fill: '#3B82F6', // Tailwind blue-500
    },
  ];

  // Calculate the end angle for the score
  // A score of 100 maps to 0 degrees (top), 0 maps to 270 degrees (3/4 of circle)
  // The chart goes from -270 to 90 degrees (full circle starting from bottom left, going clockwise)
  // We want to map 0-100 to 0-270 degrees, relative to a fixed start.
  // Let's make it simple: 0 score is 0 fill, 100 score is 270 degrees fill (starting from bottom)
  // Recharts RadialBar default angle is 270 deg (startAngle=0, endAngle=270, clockwise=true) for a full bar.
  // We'll set start and end angles to display a portion.
  // For a score out of 100, let's map it to a scale that makes sense.
  // Max sweep of 360 degrees, starting from top (90 deg) and going clockwise.
  // So, startAngle 90, endAngle 90 + (score / 100 * 360)
  // Or simpler, 0 to 270 degrees.

  return (
    <div className="w-full h-80 flex justify-center items-center">
      <ResponsiveContainer width="100%" height="100%" debounce={1}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="90%"
          barSize={25} // Thickness of the bar
          data={data}
          startAngle={90} // Start from the top
          endAngle={90 + (score / 100 * 360)} // Calculate end angle based on score
          className="rounded-full shadow-inner"
        >
          {/* Background circle for the full 100% */}
          <RadialBar
            background
            dataKey="uv"
            cornerRadius={10}
            fill="#E5E7EB" // Tailwind gray-200 for background
            isAnimationActive={false} // No animation for background
            label={<CustomLabel value={score} />} // Use custom label for the score
          />
          {/* Foreground bar for the actual score */}
          <RadialBar
            dataKey="uv"
            cornerRadius={10}
            fill="#3B82F6" // Tailwind blue-500 for the score
            label={<CustomLabel value={score} />}
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-out"
          />

          {/* This PolarAngleAxis is usually hidden for a gauge effect, but can be used for labels */}
          <PolarAngleAxis
            type="number"
            domain={[0, 100]} // Domain should match your score range
            angleAxisId={0}
            tick={false} // Hide ticks
            axisLine={false} // Hide axis line
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ScoreChart;
