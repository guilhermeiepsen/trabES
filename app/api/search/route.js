import connectMongoDB from '@/libs/mongodb';
import User from "@/models/user";
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await connectMongoDB();
    const url = new URL(req.url);
    const name = url.searchParams.get('name');

    // Corrigindo a sintaxe da consulta MongoDB
    const user = await User.find({
      name: { $regex: name, $options: 'i' },
      userType: { $ne: 0 } // Exclusão de tipo de usuário com valor 0
    });

    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Error retrieving employees' }, { status: 500 });
  }
}
