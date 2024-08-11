import mongoose, { Schema } from "mongoose";

const employeeFeedbackSchema = new Schema(
  {
    employeeId: String, // Use String para o ID do funcionário
    giverId: String,    // Use String para o ID do avaliador
    rate: Number,       // Use Number para a avaliação
    message: String     // Use String para a mensagem
  },
  {
    timestamps: true,
  }
);

const EmployeeFeedback = mongoose.models.EmployeeFeedback || mongoose.model("EmployeeFeedback", employeeFeedbackSchema);

export default EmployeeFeedback;
