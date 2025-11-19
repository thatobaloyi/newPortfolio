import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";

// 1. Extend the default User type (optional, but good practice)
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's unique ID from your database. */
      id: string; 
      // Add other properties you use, such as name and email, if you want them to be non-nullable
      name: string;
      email: string;
    } & DefaultSession["user"];
  }

  /**
   * The shape of the user object returned from your `authorize` function.
   * This type is used when defining the `user` argument in the `jwt` callback.
   */
  interface User {
    id: string;
    name: string;
    email: string;
  }
}

// 2. Extend the default JWT type
declare module "next-auth/jwt" {
  /**
   * Returned by the `jwt` callback and NextAuth.js internal functions.
   * This defines the structure of the token content.
   */
  interface JWT extends DefaultJWT {
    id: string;
    name: string;
    email: string;
  }
}