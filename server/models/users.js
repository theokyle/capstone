import mongoose from "mongoose";

const { Schema } = mongoose;

const progressSchema = new Schema({
  journeyId: { type: Schema.Types.ObjectId, ref: "Journey" },
  distanceTraveled: Number,
  nextMilestone: { type: Schema.Types.ObjectId, ref: "Milestone" },
  milestonesCompleted: [{ type: Schema.Types.ObjectId, ref: "Milestone" }],
  completed: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const userSchema = new Schema({
  username: String,
  email: String,
  totalDistance: Number,
  token: Number,
  currentJourney: { type: Schema.Types.ObjectId, ref: "Journey" },
  progress: [progressSchema]
});

const User = mongoose.model("User", userSchema);

export default User;
