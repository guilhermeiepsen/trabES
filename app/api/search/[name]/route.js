import connectMongoDB from '@/libs/mongodb';
import Employee from '@/models/employee';
import { NextResponse } from 'next/server';

export async function GET(request, {params}) {
  const {name} = params;

  if (!name) {
    return NextResponse.json({ error: 'Name query parameter is required' }, { status: 400 });
  }

  await connectMongoDB();

  try {
    const employees = await Employee.find({
      name: { $regex: name, $options: 'i' }, // Pesquisa não sensível a maiúsculas/minúsculas
    });

    return NextResponse.json(employees, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error retrieving employees' }, { status: 500 });
  }
}
