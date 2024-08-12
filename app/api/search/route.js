import connectMongoDB from '@/libs/mongodb';
import User from "@/models/user";
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
      await connectMongoDB();
      const url  = new URL(req.url)
      const name = url.searchParams.get('name');

      const user = await User.find({
          username: { $regex: name, $options: 'i' }, // Pesquisa não sensível a maiúsculas/minúsculas
        });
      return NextResponse.json(user, {status: 200});

  } catch (error) {
      return NextResponse.error({ error: 'Error retrieving employees' }, { status: 500 });
  }
}
