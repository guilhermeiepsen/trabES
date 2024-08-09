import { NextResponse } from 'next/server';
import cookie from 'cookie';

export async function middleware(req) {
    const cookies = cookie.parse(req.headers.get('cookie') || '');
    const session = cookies.session;

    if (!session) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/home', '/addTopic', '/addVacation','/editTopic', '/viewEmployee', '/giveFeedback', '/hrPolicy', '/searchEmployee'],
};
