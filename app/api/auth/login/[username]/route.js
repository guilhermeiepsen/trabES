// app/api/auth/login.js
import connectMongoDB from '@/libs/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export async function POST(req, {params}) {
    await connectMongoDB();
    const {username} = params;
    const { password } = await req.json();

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json({ message: 'Incorrect username.' }, { status: 401 });
        }

        const isPasswordValid = await user.verifyPassword(password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Incorrect password.' }, { status: 401 });
        }

        return NextResponse.json({ message: 'Login successful' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Authentication error', error: error.message }, { status: 500 });
    }
}
