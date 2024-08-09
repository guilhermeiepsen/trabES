import mongoose, { Schema } from "mongoose";

const workerSchema = new Schema(
  {
    name: String,
    age: int,
  },
  {
    timestamps: true,
  }
);

const Worker = mongoose.models.Worker || mongoose.model("Worker", workerSchema);

export default Worker;