import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from 'bcryptjs'; // Used to safely compare the user's password with the stored hash
import prisma from "./prisma";// Import your Prisma client

// --- MongoDB/Prisma Authentication Flow ---

export const authOptions:  NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Admin Login',
            credentials: {
                email: { label: "Admin Email", type: "email" },
                password: { label: "Admin Password", type: "password" }
            },
            async authorize(credentials) {
                
                if (!credentials?.password || !credentials?.email) {
                    console.error("Missing password or email in login attempt.");
                    return null;
                }
                
                // 1. Find the admin user in the MongoDB database
                // IMPORTANT: Assume you have a single admin user or a mechanism to find the admin user.
                // Replace 'admin@blog.com' with the identifier you use for your admin account.
                const adminUser = await prisma.user.findUnique({
                    where: { email: credentials.email }, // Assuming admin is identified by email
                    select: { id: true, fullname: true, email: true, password: true }
                });

                if (!adminUser || !adminUser.password) {
                    // Admin user not found or password hash is missing
                    console.error("Admin user not found or has no password hash.");
                    return null;
                }

                // 2. Compare the submitted password with the stored hash
                const isPasswordValid = await compare(
                    credentials.password, 
                    adminUser.password // The hash retrieved from MongoDB
                );

                if (isPasswordValid) {
                    // 3. Authentication successful
                    // Return the user object (EXCLUDING the hashedPassword)
                    return { 
                        id: adminUser.id, 
                        name: adminUser.fullname, 
                        email: adminUser.email 
                    };
                } else {
                    // 4. Authentication failed
                    return null;
                }
            }
        })
    ],
    // Specify the page where users will be redirected for login
    pages: {
        signIn: '/blog/admin', 
    },
    // Required to prevent errors in development when using Credentials Provider
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        // Populates the JWT with user data after a successful sign-in
        async jwt({ token, user }) {
            if (user) {
                // user is only available on sign in
                token.id = user.id;
                token.name = user.name; 
                token.email = user.email;
            }
            return token;
        },

        // Exposes the JWT data to the session object used by useSession() and getServerSession()
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id; 
                session.user.name = token.name; 
                session.user.email = token.email;
            }
            return session;
        }
    },
};
