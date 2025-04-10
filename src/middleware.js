import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('auth-token')?.value;
    const isAuthPage = request.nextUrl.pathname.startsWith('/login');

    if (!token && request.nextUrl.pathname.startsWith('/account')) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL('/account', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/account/:path*', '/login']
};