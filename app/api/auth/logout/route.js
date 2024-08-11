import { NextResponse } from 'next/server';

export async function GET(req) {
    const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 });
    
    response.cookies.set('user', '', {
        maxAge: -1,
        path: '/',
    });

    return response;
}
