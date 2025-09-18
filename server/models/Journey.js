import mongoose from "mongoose";

const { Schema } = mongoose;

const journeySchema = new Schema({
  name: String,
  universe: String,
  description: String,
  totalDistance: { type: Number, default: 0 },
  milestones: [{ type: Schema.Types.ObjectId, ref: "Milestone" }]
});

const Journey = mongoose.model("Journey", journeySchema);

export default Journey;
