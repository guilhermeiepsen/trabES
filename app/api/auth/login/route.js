import connectMongoDB from '@/libs/mongodb';
import passport from '@/libs/passport';
import session from 'cookie-session';
import { NextResponse } from 'next/server';

const sessionMiddleware = session({
    name: 'session',
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
});

export async function POST(req) {
    await connectMongoDB();

    return new Promise((resolve, reject) => {
        sessionMiddleware(req, {}, async () => {
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    console.error('Authentication error:', err);
                    return reject(new NextResponse(JSON.stringify({ message: 'Authentication error' }), { status: 500 }));
                }
                if (!user) {
                    console.warn('Invalid credentials');
                    return resolve(new NextResponse(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 }));
                }

                req.logIn(user, (err) => {
                    if (err) {
                        console.error('Login error:', err);
                        return reject(new NextResponse(JSON.stringify({ message: 'Login error' }), { status: 500 }));
                    }

                    console.log('Login successful');
                    return resolve(new NextResponse(JSON.stringify({ message: 'Login successful' }), { status: 200 }));
                });
            })(req);
        });
    });
}
