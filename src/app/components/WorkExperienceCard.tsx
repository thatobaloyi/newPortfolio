// components/WorkExperienceCard.tsx (or wherever your component is located)

import { WorkExperience } from "../types"; // Make sure this path is correct

interface WorkExperienceCardProps {
  workExperience: WorkExperience;
}

export default function WorkExperienceCard({
  workExperience,
}: WorkExperienceCardProps) {
  return (
    // You might want to wrap this in a parent div with some padding/margin,
    // like the card in your screenshot.
    <div className="bg-white p-6 rounded-lg shadow-md mb-6"> {/* Example card styling */}
      <h5 className="text-lg font-bold">{workExperience.position}</h5>
      {/* Optional: Add Company Name if your type includes it */}
      {/* <p className="text-gray-600">{workExperience.company}</p> */}
      <p className="text-gray-500 text-sm mb-3">{workExperience.duration}</p> {/* Added margin-bottom */}

      <p className="text-gray-700 mb-4 leading-relaxedg  ">{workExperience.description}</p> {/* Added margin-bottom & line-height */}

      {workExperience.skills && workExperience.skills.length > 0 && ( // Only render if skills exist
        <>
          <p className="font-semibold text-gray-800 mb-2">Key Skills:</p> {/* Added font weight & margin-bottom */}
          <div className="flex flex-wrap gap-2"> {/* Use flexbox for wrapping, add gap */}
            {workExperience.skills.map((skill, index) => (
              <span
                key={index} // Use a unique key for list items
                className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full hover:bg-gray-300 transition-colors duration-200"
                // Tailwind classes for a nice tag look:
                // bg-gray-200: light gray background
                // text-gray-800: dark text
                // text-xs: small font size
                // px-3 py-1: horizontal and vertical padding
                // rounded-full: pill shape
                // hover:bg-gray-300: slight hover effect
              >
                {skill}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}