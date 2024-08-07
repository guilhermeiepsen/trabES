import connectMongoDB from '@/libs/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export async function POST(req) {
    await connectMongoDB();

    const { username, password, email } = await req.json();

    try {
        const user = new User({ username, email });
        await User.register(user, password);
        return new NextResponse(JSON.stringify({ message: 'User registered successfully' }), { status: 201 });
    } catch (error) {
        console.error('Error registering user:', error);
        return new NextResponse(JSON.stringify({ message: 'Error registering user' }), { status: 500 });
    }
}
