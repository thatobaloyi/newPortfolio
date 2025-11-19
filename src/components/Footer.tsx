// components/Footer.tsx

import Socials from "./Socials"; // Make sure the path is correct

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Get current year dynamically

  return (
    // Added common footer styling:
    // bg-gray-800: Dark background
    // text-white: White text
    // p-6: More generous padding
    // mt-auto: This is crucial for a flexbox sticky footer (explained below)
    <footer className="bg-gray-800 text-white p-6 text-center mt-auto">
      <div className="container mx-auto"> {/* Optional: Center content and limit width */}
        <p className="mb-4"> {/* Added margin-bottom to separate from socials */}
          &copy; Thato Baloyi {currentYear}
        </p>
        <Socials />
      </div>
    </footer>
  );
}