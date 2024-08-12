// pages/api/feedback.js

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
        await EmployeeFeedback.create({ 
            employeeId: String(employeeId), // Garantir que seja uma string
            giverId: String(giverId), // Garantir que seja uma string
            rate: parseInt(rate, 10), // Converter rate para número inteiro
            message 
        });

        return NextResponse.json({ message: "Feedback enviado com sucesso" }, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar feedback:", error);
        return NextResponse.json({ error: "Erro ao enviar feedback" }, { status: 500 });
    }
}

export async function GET({ params }) {
  
    try {
      await connectMongoDB();
  
      // Buscar todos os feedbacks relacionados ao employeeId fornecido
      const feedbacks = await EmployeeFeedback.find().populate('giverId').populate('employeeId').sort({ createdAt: -1 });
  
      return NextResponse.json(feedbacks, { status: 200 });
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      return NextResponse.json({ error: 'Failed to fetch feedbacks' }, { status: 500 });
    }
  }