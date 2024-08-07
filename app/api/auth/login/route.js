// pages/api/auth/login.js

import connectMongoDB from '@/libs/mongodb';
import passport from '@/libs/passport';
import session from 'cookie-session';
import { NextResponse } from 'next/server';

const sessionMiddleware = session({
    name: 'session',
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000, // 1  dia
});

export const middleware = [sessionMiddleware, passport.initialize(), passport.session()];

export async function POST(req) {
    await connectMongoDB();
    const { username, password } = await req.json();

    return new Promise((resolve, reject) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) return reject(new Error('Authentication error'));
            if (!user) return resolve(NextResponse.json({ message: 'Invalid credentials' }, { status: 401 }));

            req.logIn(user, (err) => {
                if (err) return reject(new Error('Login error'));
                return resolve(NextResponse.json({ message: 'Login successful' }));
            });
        })({ body: { username, password } });
    });
}
