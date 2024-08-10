import connectMongoDB from '@/libs/mongodb';
import User from "@/models/user";
import { NextResponse } from 'next/server';

export async function GET(request, {params}) {
  const {name} = params;

  if (!name) {
    return NextResponse.json({ error: 'Name query parameter is required' }, { status: 400 });
  }

  await connectMongoDB();

  try {
    const user = await User.find({
      name: { $regex: name, $options: 'i' }, // Pesquisa não sensível a maiúsculas/minúsculas
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error retrieving employees' }, { status: 500 });
  }
}
