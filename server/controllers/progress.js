import User from "../models/User.js";
import Journey from "../models/Journey.js";

export async function handlerGetProgress(req, res) {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    res.json(user.progress);
  } catch (error) {
    res.status(500).json(error.errors);
  }
}

export async function handlerGetProgressById(req, res) {
  try {
    const userId = req.user._id;
    const progressId = req.params.progressId;
    const user = await User.findById(userId);
    const progress = user.progress.id(progressId);
    res.json(progress);
  } catch (error) {
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
      nextMilestone: journey.milestones[0].id,
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
    const progressId = req.params.progressId;
    const distance = req.body.distance;

    const user = await User.findById(userId);
    const progress = user.progress.id(progressId);
    progress.distanceTraveled += distance;
    const data = await user.save();
    res.json(data);
  } catch (error) {
    res.status(500).json(error.errors);
  }
}

export async function handlerCompleteJourney(req, res) {
  try {
    const userId = req.user._id;
    const progressId = req.params.progressId;

    const user = await User.findById(userId);
    const progress = user.progress.id(progressId);
    progress.completed = true;
    const data = await user.save();
    res.json(data);
  } catch (error) {
    res.status(500).json(error.errors);
  }
}
