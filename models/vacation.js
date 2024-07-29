import mongoose, { Schema } from "mongoose";

const vacationSchema = new Schema(
  {
    startDate: Date,
    endDate: Date,
    message: String,
    // employeeId: Number
  },
  {
    timestamps: true,
  }
);

const Vacation = mongoose.models.Vacation || mongoose.model("Vacation", vacationSchema);

export default Vacation;