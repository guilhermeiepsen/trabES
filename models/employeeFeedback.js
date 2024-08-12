import mongoose, { Schema } from "mongoose";

const employeeFeedbackSchema = new Schema(
  {
    employeeId: {type: Schema.Types.ObjectId, ref: 'User'},
    giverId: {type: Schema.Types.ObjectId, ref: 'User'},
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
