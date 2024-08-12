import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { name, age, cpf, phoneNumber, corporateEmail, department, admissionDate, role, active } = await request.json();
    await connectMongoDB();
    await Employee.create({ name, age, cpf, phoneNumber, corporateEmail, department, admissionDate, role, active });
    return NextResponse.json({ message: "Employee Registered" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const users = await User.find({userType: {$ne: 0 }}).sort({userType: 1});
    return NextResponse.json({users});
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await User.findByIdAndDelete(id);
    return NextResponse.json({message: "Employee deleted"}, {status: 200});
}