import Activity from "../models/activity.js";

export async function handlerGetActivities(req, res) {
  try {
    const userId = req.user._id;
    const activities = await Activity.find({ userId: userId });
    res.json(activities);
  } catch (error) {
    return res.status(500).json(error.errors);
  }
}

export async function handlerPostActivity(req, res) {
  try {
    const userId = req.user._id;
    const activity = new Activity({
      userId: userId,
      distance: req.body.distance,
      date: req.body.date
    });
    const data = await activity.save();
    res.status(201).json(data);
  } catch (error) {
    console.log(error);

    if ("name" in error && error.name === "ValidationError")
      return res.status(400).json(error.errors);

    return res.status(500).json(error.errors);
  }
}

export async function handlerDeleteActivity(req, res) {
  try {
    const data = await Activity.findByIdAndDelete(req.params.activityId);
    res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
}

export async function handlerUpdateActivity(req, res) {
  try {
    const userId = req.user._id;
    const body = req.body;
    const data = await Activity.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userId: userId,
          distance: body.distance,
          date: body.date
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    res.json(data);
  } catch (error) {
    console.log(error);
    if ("name" in error && error.name === "ValidationError")
      return res.status(400).json(error.errors);

    return res.status(500).json(error.errors);
  }
}
