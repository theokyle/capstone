import mongoose from "mongoose";

const { Schema } = mongoose;

const activitySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  distance: { type: Number, default: 0 },
  date: { type: String }
});

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
