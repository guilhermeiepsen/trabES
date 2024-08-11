import connectMongoDB from "@/libs/mongodb";
import Feedback from '@/models/employeeFeedback';
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
    const { id } = params; // Captura o parâmetro id da URL
    const { giverId, rate, message } = await request.json();
    await connectMongoDB();
    console.log(id);

    // Atualiza o papel do usuário para "Gerente"
    // const user = await User.findByIdAndUpdate(id, { role: "Gerente" }, { new: true });

    try {
        const newFeedback = new Feedback({
            employeeId: id,
            giverId: giverId,
            rate: parseInt(rate),
            message: message,
            createdAt: new Date(),
        })

        await newFeedback.save();

        return NextResponse.json({ message: 'Employee feedback added' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error given feedback to employee' }, { status: 500 });
    }

}
