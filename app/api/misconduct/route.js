// pages/api/misconduct.js

//import mongoose from "mongoose";
import connectMongoDB from "@/libs/mongodb";
import MisconductReport from "@/models/misconductReport";
import { NextResponse } from "next/server";



export async function POST(request) {
    const { employeeId, reporterId, description  } = await request.json();
    await connectMongoDB();
    await MisconductReport.create({ employeeId, reporterId, description, createdAt: new Date() });
    return NextResponse.json({ message: "Report Enviado" }, { status: 201 });
}
/*
export async function POST(request) {
    try {
        const { employeeId, reporterId, description } = await request.json();
        await connectMongoDB();

        if (!employeeId || !reporterId || !description) {
            return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
        }

        //const empId = mongoose.Types.ObjectId(employeeId);
        //const repId = mongoose.Types.ObjectId(reporterId);

        const report = await MisconductReport.create({employeeId: empId, reporterId: repId, description, createdAt: new Date()});
        return NextResponse.json({ message: "Report enviado com sucesso", report }, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar relatório de infração:", error);
        return NextResponse.json({ error: "Erro ao enviar report" }, { status: 500 });
    }
}
    */



export async function GET() {
    try {
        await connectMongoDB();
        const reports = await MisconductReport.find().populate('employeeId').populate('reporterId').sort({ updatedAt: -1 });
        return NextResponse.json({reports});
    } catch (error) {
        console.error('Error fetching reports:', error);
        return new Response('Failed to fetch reports', { status: 500 });
    }
}
