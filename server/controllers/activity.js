import Activity from "../models/Activity.js";

export async function handlerGetActivities(req, res) {
  try {
    const userId = req.user._id;
    const activities = await Activity.find({ userId: userId }).sort({
      date: 1
    });
    res.json(activities);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.errors);
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
      res.status(400).json(error.errors);

    res.status(500).json(error.errors);
  }
}

export async function handlerDeleteActivity(req, res) {
  try {
    const data = await Activity.findByIdAndDelete(req.params.activityId);

    res.json(data);
  } catch (error) {
    res.status(500).json(error.errors);
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
    if ("name" in error && error.name === "ValidationError")
      res.status(400).json(error.errors);

    res.status(500).json(error.errors);
  }
}
