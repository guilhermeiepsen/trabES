import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";


export async function POST(request) {
    const {username, email, password} = await request.json();
    await connectMongoDB();
    try {
        const newUser = new User({username, email});
        await User.register(newUser, password);
        return NextResponse.json({ message: 'New User Registered' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    } 
}