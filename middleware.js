import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(request) {
        if (request.nextUrl.pathname.startsWith('/checkout/payment') && !request.nextauth.token) {
            return NextResponse.redirect(new URL('/auth/signin', request.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
);

export const config = {
    matcher: ['/checkout/payment']
};