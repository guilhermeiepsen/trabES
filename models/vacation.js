import mongoose, { Schema } from "mongoose";

const vacationSchema = new Schema(
  {
    employeeId: {type: Schema.Types.ObjectId, ref: 'User'},
    managerId: {type: Schema.Types.ObjectId, ref: 'User'},
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