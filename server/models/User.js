import mongoose from "mongoose";

const { Schema } = mongoose;

const progressSchema = new Schema({
  journeyId: { type: Schema.Types.ObjectId, ref: "Journey" },
  totalDistance: { type: Number, default: 0 },
  milestoneDistance: { type: Number, default: 0 },
  nextMilestone: { type: Schema.Types.ObjectId, ref: "Milestone" },
  milestonesCompleted: [{ type: Schema.Types.ObjectId, ref: "Milestone" }],
  completed: { type: Boolean, default: false }
});

const userSchema = new Schema({
  username: String,
  email: String,
  totalDistance: Number,
  token: String,
  activeProgressId: { type: Schema.Types.ObjectId, ref: "Progress" },
  progress: [progressSchema]
});

const User = mongoose.model("User", userSchema);

export default User;
