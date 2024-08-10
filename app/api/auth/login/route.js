import connectMongoDB from '@/libs/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';

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
        } else {
            const token = user.id;
            const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });

            response.cookies.set('user', token, {
                path: '/',
                maxAge: 60 * 60 * 24, // 1 dia
                httpOnly: false,
            });

            return response;
        }
    } catch (error) {
        return NextResponse.json({ message: 'Authentication error', error: error.message }, { status: 500 });
    }
}
