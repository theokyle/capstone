import mongoose from "mongoose";

const { Schema } = mongoose;

const milestoneSchema = Schema({
  name: String,
  tags: [String],
  distance: Number,
  description: String
});

const journeySchema = new Schema({
  name: String,
  universe: String,
  description: String,
  totalDistance: Number,
  milestones: [milestoneSchema]
});

const Journey = mongoose.model("Journey", journeySchema);

export default Journey;
