import mongoose, { Schema } from "mongoose";

const employeeFeedbackSchema = new Schema(
  {
    employeeId: Number,
    giverId: Number,
    rate: Number,
    message: String,
    createdAt: Date,
  },
  {
    timestamps: true,
  }
);

const EmployeeFeedback = mongoose.models.EmployeeFeedback || mongoose.model("EmployeeFeedback", employeeFeedbackSchema);

export default EmployeeFeedback;