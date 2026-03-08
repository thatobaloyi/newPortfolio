import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import NextAuthSessionProvider from "./providers/SessionProvider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thato Baloyi",
  description: "This is Thato Baloyi's Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en">
      <body
        className={`${manrope.variable} ${sora.variable} antialiased`}
      >
        <NextAuthSessionProvider>
          <Header />
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
