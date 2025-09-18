import mongoose from "mongoose";

const { Schema } = mongoose;

const milestoneSchema = Schema({
  name: String,
  tags: [String],
  distance: Number,
  description: String
});

const Milestone = mongoose.model("Milestone", milestoneSchema);

export default Milestone;
