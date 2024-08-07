import connectMongoDB from '@/libs/mongodb';
import passport from '@/libs/passport';
import session from '@/libs/session';
import { NextResponse } from 'next/server';
import express from 'express';
import { json } from 'express';

const app = express();
app.use(json());
app.use(session);

app.post('/api/auth/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return res.status(500).json({ message: err.message });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        req.logIn(user, (err) => {
            if (err) return res.status(500).json({ message: err.message });
            return res.status(200).json({ message: 'Logged in successfully' });
        });
    })(req, res, next);
});

export async function POST(request) {
    await connectMongoDB();
    return NextResponse.json({ message: 'Login handler' }, { status: 200 });
}
