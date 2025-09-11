import Journey from "../models/journeys.js";

export async function handlerGetMilestones(req, res) {
  try {
    const journeyId = req.params.journeyId;
    const journey = await Journey.findById(journeyId);
    res.json(journey.milestones);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
}

export async function handlerGetMilestoneById(req, res) {
  try {
    const journeyId = req.params.journeyId;
    const milestoneId = req.params.milestoneId;
    const journey = await Journey.findById(journeyId);
    const milestone = journey.milestones.id(milestoneId);
    res.json(milestone);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
}

export async function handlerAddMilestone(req, res) {
  try {
    const journeyId = req.params.journeyId;
    const milestoneInfo = req.body;

    const journey = await Journey.findById(journeyId);
    const newMilestone = journey.milestones.create(milestoneInfo);
    journey.milestones.push(newMilestone);
    await journey.save();

    res.json(newMilestone);
  } catch (error) {
    console.log(error);

    return res.status(500).json(error.errors);
  }
}

export async function handlerUpdateMilestone(req, res) {
  try {
    const journeyId = req.params.journeyId;
    const milestoneId = req.params.milestoneId;
    const milestoneInfo = req.body;

    const journey = await Journey.findOneAndUpdate(
      {
        _id: journeyId,
        "milestones._id": milestoneId
      },
      {
        $set: {
          "milestones.$": milestoneInfo
        }
      }
    );

    res.json(journey.milestones);
  } catch (error) {
    console.log(error);

    return res.status(500).json(error.errors);
  }
}
