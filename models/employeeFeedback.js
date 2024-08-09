import mongoose, { Schema } from "mongoose";

const employeeFeedback = new Schema(
  {
    employeeId: Number,
    giverId: Number,
    rate: Number,
    message: stringify,
    createdAt: Date,
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;