import { NextResponse } from 'next/server';
import cookie from 'cookie';

export async function GET(req) {
    const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 });
    response.headers.set('Set-Cookie', cookie.serialize('session', '', {
        httpOnly: true,
        secure: 'humanlink',
        maxAge: -1, 
        sameSite: 'strict',
        path: '/'
    }));

    return response;
}
