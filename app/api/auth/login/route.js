import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { username, password } = await request.json();
    await connectMongoDB();
    try {
        
       
       
        return NextResponse.json({ message: 'Auth Ok' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
