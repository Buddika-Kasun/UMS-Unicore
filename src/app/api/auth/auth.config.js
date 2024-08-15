export const authConfig = {
    session: {
        strategy: 'jwt',
    },
    providers: [],
    callbacks: {
        async session({ session, token, user }) {
            // Customize the session object here
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role; // Example of adding a custom property
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role; // Example of adding a custom property
            }
            return token;
        }
    },
    secret: process.env.NEXTAUTH_SECRET, // Ensure this is set
    session: {
        // Configure session expiry
        maxAge: 1 * 60 * 60, // Session will expire in 1 hours (in seconds)
        //maxAge: 30,
        //updateAge: 30 * 60, // Session will be updated every 30 min (in seconds)
        updateAge: 2 * 60 * 60,
    },
}