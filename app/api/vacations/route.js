import connectMongoDB from "@/libs/mongodb";
import Vacation from "@/models/vacation";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { startDate, endDate, message } = await request.json();
    await connectMongoDB();
    await Vacation.create({ startDate, endDate, message });
    return NextResponse.json({ message: "Vacation Request Registered" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const vacations = await Vacation.find();
    return NextResponse.json({vacations});
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Vacation.findByIdAndDelete(id);
    return NextResponse.json({message: "Vacation Request deleted"}, {status: 200});
}