import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema(
  {
    name: String,
    age: Number,
    cpf: Number,
    phoneNumber: Number,
    corporateEmail: String,
    department: String,
    admissionDate: Date,
    role: String,
    active: Boolean,
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;