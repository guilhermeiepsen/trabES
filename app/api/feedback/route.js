import connectMongoDB from "@/libs/mongodb";
import EmployeeFeedback from "@/models/employeeFeedback";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { employeeId, giverId, rate, message } = await request.json();
        await connectMongoDB();

        // Validar os dados recebidos
        if (!employeeId || !giverId || rate === undefined || rate === null || !message) {
            return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
        }

        // Criar o feedback
        await EmployeeFeedback.create({ employeeId, giverId, rate, message });

        return NextResponse.json({ message: "Feedback enviado com sucesso" }, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar feedback:", error);
        return NextResponse.json({ error: "Erro ao enviar feedback" }, { status: 500 });
    }
}
