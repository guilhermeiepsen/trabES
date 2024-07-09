import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema(
  {
    name: String,
    cpf: Number,
    phoneNumber: Number,
    corporateEmail: String,
    department: String,
    role: String,
    active: Boolean,
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;