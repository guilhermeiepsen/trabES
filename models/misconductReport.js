// models/misconductReport.js

import mongoose, { Schema } from "mongoose";

const misconductReportSchema = new Schema(
  {
    employeeId: {type: Schema.Types.ObjectId, ref: 'User'},
    reporterId: {type: Schema.Types.ObjectId, ref: 'User'},
    description: { type: String, required: true },
    //createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const MisconductReport = mongoose.models.MisconductReport || mongoose.model("MisconductReport", misconductReportSchema);

export default MisconductReport;
