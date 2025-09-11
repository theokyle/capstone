import mongoose from "mongoose";

const { Schema } = mongoose;

const activitySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  distance: Number,
  date: Date
});

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
