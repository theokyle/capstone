import Journey from "../models/Journey.js";
import Milestone from "../models/Milestone.js";
import User from "../models/User.js";

export async function handlerGetJourneys(req, res) {
  try {
    const query = req.query;
    const journeys = await Journey.find(query).populate("milestones");
    res.json(journeys);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
}

export async function handlerGetJourneyById(req, res) {
  try {
    const journeyId = req.params.journeyId;
    const journey = await Journey.findById(journeyId);
    res.json(journey);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
}

export async function handlerCreateJourney(req, res) {
  try {
    const userId = req.user._id;
    const newJourney = new Journey(req.body);

    // add journey to the user that created it
    const user = await User.findById(userId);
    const defaultMilestone = await Milestone.findById(
      process.env.DEFAULT_MILESTONE
    );

    newJourney.milestones.push(defaultMilestone);

    const progressItem = {
      journeyId: newJourney._id,
      totalDistance: 0,
      nextMilestone: defaultMilestone._id,
      milestonesCompleted: [],
      completed: false
    };

    const newProgressItem = user.progress.create(progressItem);
    user.progress.push(newProgressItem);
    await user.save();

    const data = await newJourney.save();
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    if ("name" in error && error.name === "ValidationError")
      return res.status(400).json(error.errors);
    return res.status(500).json(error.errors);
  }
}

export async function handlerDeleteJourney(req, res) {
  try {
    const data = await Journey.findByIdAndDelete(req.params.journeyId);
    res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
}

export async function handlerUpdateJourney(req, res) {
  try {
    const body = req.body;
    const data = await Journey.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: body.name,
          universe: body.universe,
          description: body.description
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

export async function handlerGetJourneyMilestones(req, res) {
  try {
    const journeyId = req.params.journeyId;
    const journey = await Journey.findById(journeyId).populate("milestones");
    res.json(journey.milestones);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
}

export async function handlerAddMilestone(req, res) {
  try {
    const journeyId = req.params.journeyId;
    const milestoneId = req.params.milestoneId;

    const journey = await Journey.findById(journeyId);
    const milestone = await Milestone.findById(milestoneId);
    journey.milestones.push(milestone._id);
    journey.totalDistance += milestone.distance;
    await journey.save();

    res.json(journey);
  } catch (error) {
    console.log(error);

    return res.status(500).json(error.errors);
  }
}
