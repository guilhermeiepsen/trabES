// pages/api/auth/login.js

import connectMongoDB from '@/libs/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import { sessionMiddleware } from '@/libs/session';

export const middleware = [sessionMiddleware];

export async function POST(req) {
    await connectMongoDB();
    const { username, password } = await req.json();

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json({ message: 'Incorrect username.' }, { status: 401 });
        }

        const isPasswordValid = await user.verifyPassword(password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Incorrect password.' }, { status: 401 });
        }

        req.session.user = { id: user._id, username: user.username };

        return NextResponse.json({ message: 'Login successful' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Authentication error', error: error.message }, { status: 500 });
    }
}
