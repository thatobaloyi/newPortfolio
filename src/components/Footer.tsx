// components/Footer.tsx
import Socials from "./Socials"; // Make sure the path is correct

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Get current year dynamically

  return (
    <footer className="bg-muted text-secondary p-6 text-center mt-auto">
      <div className="container mx-auto">
        <p className="mb-4">
          &copy; Thato Baloyi {currentYear}
        </p>
        <Socials />
      </div>
    </footer>
  );
}