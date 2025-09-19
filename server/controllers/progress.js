import User from "../models/User.js";
import Journey from "../models/Journey.js";
import Milestone from "../models/Milestone.js";

export async function handlerGetAllProgress(req, res) {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId)
      .populate("progress")
      .populate("progress.journeyId")
      .populate("progress.nextMilestone")
      .populate("progress.milestonesCompleted");
    res.json(user.progress);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.errors);
  }
}

export async function handlerGetActiveProgress(req, res) {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId)
      .populate("progress")
      .populate("progress.journeyId")
      .populate("progress.nextMilestone")
      .populate("progress.milestonesCompleted");
    const activeProgress = user.progress.id(user.activeProgressId);
    res.json(activeProgress);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.errors);
  }
}

export async function handlerGetProgressById(req, res) {
  try {
    const userId = req.user._id;
    const progressId = req.params.progressId;
    const user = await User.findById(userId)
      .populate("progress")
      .populate({ path: "progress.journeyId", model: "Journey" });
    console.log(user);
    const progress = user.progress.id(progressId);
    res.json(progress);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.errors);
  }
}

export async function handlerAddJourneyToProgress(req, res) {
  try {
    const userId = req.user._id;
    const journeyId = req.params.journeyId;
    const journey = await Journey.findById(journeyId);

    const user = await User.findById(userId);
    const progressItem = {
      journeyId: journeyId,
      totalDistance: 0,
      nextMilestone: journey.milestones[0]._id,
      milestonesCompleted: [],
      completed: false
    };

    const newProgressItem = user.progress.create(progressItem);

    if (!user.activeProgressId) {
      user.activeProgressId = newProgressItem._id;
    }

    user.progress.push(newProgressItem);
    await user.save();

    res.json(newProgressItem);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.errors);
  }
}

export async function handlerDeleteProgressItem(req, res) {
  try {
    const userId = req.user._id;
    const progressId = req.params.progressId;

    const user = await User.findById(userId);
    const progressItem = user.progress.id(progressId);

    if (user.activeProgressId.equals(progressItem._id)) {
      user.activeProgressId = null;
    }
    progressItem.deleteOne();
    user.save();

    res.json(user.progress);
  } catch (error) {
    res.status(500).json(error.errors);
  }
}

export async function handlerMakeActive(req, res) {
  try {
    const userId = req.user._id;
    const progressId = req.params.progressId;

    const user = await User.findById(userId);
    user.activeProgressId = progressId;
    const data = await user.save();
    res.json(data);
  } catch (error) {
    res.status(500).json(error.errors);
  }
}

export async function handlerAddDistance(req, res) {
  try {
    const userId = req.user._id;
    const distance = parseInt(req.body.distance);

    const user = await User.findById(userId);
    const progress = user.progress.id(user.activeProgressId);

    progress.totalDistance += distance;
    progress.milestoneDistance += distance;

    const nextMilestone = await Milestone.findById(progress.nextMilestone);
    const journey = await Journey.findById(progress.journeyId);

    if (progress.milestoneDistance >= nextMilestone.distance) {
      progress.milestoneDistance -= nextMilestone.distance;
      progress.milestonesCompleted.push(progress.nextMilestone);
      if (progress.milestonesCompleted.length == journey.milestones.length) {
        progress.completed = true;
      } else {
        progress.nextMilestone =
          journey.milestones[progress.milestonesCompleted.length]._id;
      }
    }

    const data = await user.save();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.errors);
  }
}

export async function handlerResetProgress(req, res) {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    const progress = user.progress.id(user.activeProgressId);
    const journey = await Journey.findById(progress.journeyId);

    progress.totalDistance = 0;
    progress.milestoneDistance = 0;
    progress.milestonesCompleted = [];
    progress.nextMilestone = journey.milestones[0]._id;

    const resetUser = await user.save();
    res.json(resetUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.errors);
  }
}
