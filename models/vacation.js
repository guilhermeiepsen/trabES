import mongoose, { Schema } from "mongoose";

const vacationSchema = new Schema(
  {
    employeeId: String,
    managerId: String,
    approved: Boolean,
    startDate: Date,
    endDate: Date,
    message: String
  },
  {
    timestamps: true,
  }
);

const Vacation = mongoose.models.Vacation || mongoose.model("Vacation", vacationSchema);

export default Vacation;