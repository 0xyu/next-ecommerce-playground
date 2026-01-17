import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnDashboard = nextUrl.pathname.startsWith('/member') || nextUrl.pathname.startsWith('/products')
            if (isOnDashboard) {
                if (isLoggedIn) return true
                return false // Redirect unauthenticated users to login page
            } else if (isLoggedIn && nextUrl.pathname === '/login') {
                return Response.redirect(new URL('/member', nextUrl))
            }
            return true
        },
        async session({ session, token }) {
            console.log('Session Callback - Token:', token);
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            if (session.user && token.role) {
                session.user.role = token.role as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id
                token.role = user.role
            }
            return token
        }
    },
    providers: [], // Providers added in auth.ts
} satisfies NextAuthConfig
