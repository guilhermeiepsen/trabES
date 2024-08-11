import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

// Função para pegar o parâmetro da URL
export async function GET(request, { params }) {
    const { id } = params; // Captura o parâmetro id da URL
    await connectMongoDB();

    const user = await User.findById(id);

    if (!user) {
        return NextResponse.json({ message: 'Employee not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Employee found', user }, { status: 200 });
}

export async function POST(request, { params }) {
    const { id } = params; // Captura o parâmetro id da URL
    await connectMongoDB();

    // Atualiza o papel do usuário para "Gerente"
    const user = await User.findByIdAndUpdate(id, { role: "Gerente" }, { new: true });

    if (!user) {
        return NextResponse.json({ message: 'Employee not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Employee role updated to Gerente', user }, { status: 200 });
}
