// pages/api/misconduct.js

import connectMongoDB from "@/libs/mongodb";
import MisconductReport from "@/models/misconductReport";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { employeeId, reporterId, description } = await request.json();
        await connectMongoDB();

        // Validar os dados recebidos
        if (!employeeId || !reporterId || !description) {
            return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
        }

        // Criar o relatório de infração
        const report = await MisconductReport.create({
            employeeId: String(employeeId), // Garantir que seja uma string
            reporterId: String(reporterId), // Garantir que seja uma string
            description,
            createdAt: new Date() // Data de criação
        });

        return NextResponse.json({ message: "Relatório de infração enviado com sucesso", report }, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar relatório de infração:", error);
        return NextResponse.json({ error: "Erro ao enviar relatório de infração" }, { status: 500 });
    }
}
