import connectMongoDB from "@/libs/mongodb";
import Employee from "@/models/employee";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { 
    newName: name, 
    newCpf: cpf, 
    newPhoneNumber: phoneNumber, 
    newCorporateEmail: corporateEmail, 
    newDepartment: department, 
    newRole: role, 
    newActive: active 
  } = await request.json(); //requeste de um update via json
  await connectMongoDB();
  await Employee.findByIdAndUpdate(id, { name, cpf, phoneNumber, corporateEmail, department, role, active }); //substitui as variáveis pelas carregadas anteriormente no request
  return NextResponse.json({ message: "Employee updated" }, { status: 200 }); //resposta final depois do update
}

export async function GET(request, {params}) { //GET A SINGLE TOPIC BY ID
    const {id} = params;
    await connectMongoDB();
    const employee = await Employee.findOne( {_id: id} );
    return NextResponse.json({ employee }, { status: 200 });
}