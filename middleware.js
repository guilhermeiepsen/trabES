import { NextResponse } from 'next/server';

export async function middleware(req) {
    const cookies = req.cookies;
    const session = cookies.get('user');

    if (!session) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/home', 
        '/addTopic', 
        '/addVacation', 
        '/editTopic', 
        '/viewEmployee', 
        '/giveFeedback', 
        '/hrPolicy', 
        '/searchEmployee'
    ],
};
