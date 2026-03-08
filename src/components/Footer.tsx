// components/Footer.tsx
import Socials from "./Socials"; // Make sure the path is correct

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Get current year dynamically

  return (
    <footer className="mt-12 px-4 pb-8">
      <div className="footer-float container mx-auto grid max-w-6xl gap-6 rounded-2xl p-6 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div className="text-center md:text-left">
          <p className="text-lg font-semibold text-foreground">Thato Baloyi</p>
          <p className="mt-1 text-sm text-muted-foreground">Software developer</p>
          <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            &copy; {currentYear} All rights reserved.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 md:items-end">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Connect</p>
          <Socials />
        </div>
      </div>
    </footer>
  );
}