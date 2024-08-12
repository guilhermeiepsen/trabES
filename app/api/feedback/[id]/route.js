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
export async function GET(request, { params }) {
    const { employeeId } = params; // Obter o employeeId dos parâmetros da URL
  
    try {
      await connectMongoDB();
  
      if (!employeeId) {
        return NextResponse.json({ error: 'Employee ID is required' }, { status: 400 });
      }
  
      // Buscar todos os feedbacks relacionados ao employeeId fornecido
      const feedbacks = await EmployeeFeedback.find({ employeeId  : {employeeId}})
        .populate('giverId') // Popula o campo giverId
        .populate('employeeId') // Popula o campo employeeId
        .sort({ createdAt: -1 }); // Ordena pelos feedbacks mais recentes
  
      return NextResponse.json(feedbacks, { status: 200 });
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      return NextResponse.json({ error: 'Failed to fetch feedbacks' }, { status: 500 });
    }
  }