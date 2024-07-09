import connectMongoDB from "@/libs/mongodb";
import Employee from "@/models/employee";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { name, cpf, phoneNumber, corporateEmail, department, role, active } = await request.json();
    await connectMongoDB();
    await Employee.create({ name, cpf, phoneNumber, corporateEmail, department, role, active });
    return NextResponse.json({ message: "Employee Registered" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const employees = await Employee.find();
    return NextResponse.json({employees});
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Employee.findByIdAndDelete(id);
    return NextResponse.json({message: "Employee deleted"}, {status: 200});
}