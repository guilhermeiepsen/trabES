import { NextResponse } from 'next/server';
import cookie from 'cookie';

export async function GET(req) {
    const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 });
    response.headers.set('Set-Cookie', cookie.serialize('session', '', {
        maxAge: -1,
        path: '/'
    }));

    return response;
}
