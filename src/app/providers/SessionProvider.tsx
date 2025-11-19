'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

// This simple client component wraps the rest of the application
// and makes the NextAuth session context available to all client components.
export default function NextAuthSessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}