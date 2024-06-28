import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await request.json(); //requeste de um update via json
  await connectMongoDB();
  await Topic.findByIdAndUpdate(id, { title, description }); //substitui as variáveis pelas carregadas anteriormente no request
  return NextResponse.json({ message: "Topic updated" }, { status: 200 }); //resposta final depois do update
}

export async function GET(request, {params}) { //GET A SINGLE TOPIC BY ID
    const {id} = params;
    await connectMongoDB();
    const topic = await Topic.findOne( {_id: id} );
    return NextResponse.json({ topic }, { status: 200 });
}