// components/EducationCard.tsx

import { Education } from "../types"; // Ensure this path is correct

interface EducationCardProps {
  education: Education;
}

export default function EducationCard({ education }: EducationCardProps) {
  return (
    // Outer card container with basic styling for a clean look
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      {/* Title of Degree/Qualification */}
      <h5 className="text-lg font-bold text-gray-900 mb-1">{education.title}</h5>

      {/* Institution Name */}
      <p className="text-md text-gray-700">{education.institution}</p>

      {/* Duration/Graduation */}
      <p className="text-gray-500 text-sm mb-4">{education.duration}</p> {/* Added margin-bottom */}

      {/* Optional Description/Summary */}
      {education.description && (
        <p className="text-gray-700 mb-4 leading-relaxed">{education.description}</p>
      )}

      {/* Optional: Key Coursework/Modules */}
      {education.keyCoursework && education.keyCoursework.length > 0 && (
        <>
          <p className="font-semibold text-gray-800 mb-2">Key Coursework:</p>
          <div className="flex flex-wrap gap-2"> {/* Uses flexbox for wrapping tags, with a gap */}
            {education.keyCoursework.map((course, index) => (
              <span
                key={index} // Unique key for list items
                className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full hover:bg-blue-200 transition-colors duration-200"
                // Tailwind classes for a tag look:
                // bg-blue-100: light blue background (different color than work experience skills)
                // text-blue-800: dark blue text
                // text-xs: small font size
                // px-3 py-1: horizontal and vertical padding
                // rounded-full: pill shape
                // hover:bg-blue-200: slight hover effect
              >
                {course}
              </span>
            ))}
          </div>
        </>
      )}

      {/* Optional: Achievements */}
      {education.achievements && education.achievements.length > 0 && (
        <div className="mt-4"> {/* Add some top margin */}
          <p className="font-semibold text-gray-800 mb-2">Achievements:</p>
          <ul className="list-disc list-inside text-gray-700"> {/* Unordered list with disc bullets */}
            {education.achievements.map((achievement, index) => (
              <li key={index} className="mb-1">{achievement}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}