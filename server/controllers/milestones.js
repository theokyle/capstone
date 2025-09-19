import Milestone from "../models/Milestone.js";
import Journey from "../models/Journey.js";

export async function handlerGetMilestones(req, res) {
  try {
    const query = req.query;
    const milestones = await Milestone.find(query);
    res.json(milestones);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
}

export async function handlerGetMilestoneById(req, res) {
  try {
    const milestoneId = req.params.milestoneId;
    const milestone = await Milestone.findById(milestoneId);
    res.json(milestone);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
}

export async function handlerCreateMilestone(req, res) {
  try {
    const milestoneInfo = {
      name: req.body.name,
      tag: req.body.tag,
      imgUrl: req.body.imgUrl,
      distance: req.body.distance,
      description: req.body.description
    };

    const milestone = new Milestone(milestoneInfo);

    // Allows the new milestone to optionally be added to a journey at its creation
    if (req.body.journeyId) {
      const journey = await Journey.findById(req.body.journeyId);
      journey.milestones.push(milestone._id);
      journey.totalDistance += milestone.distance;
      await journey.save();
    }

    await milestone.save();

    res.json(milestone);
  } catch (error) {
    console.log(error);

    return res.status(500).json(error.errors);
  }
}

export async function handlerUpdateMilestone(req, res) {
  try {
    const milestone = await Milestone.findByIdAndUpdate(
      req.params.milestoneId,
      {
        $set: {
          name: req.body.name,
          tag: req.body.tag,
          distance: req.body.distance,
          description: req.body.description
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    res.json(milestone);
  } catch (error) {
    console.log(error);

    return res.status(500).json(error.errors);
  }
}

export async function handlerDeleteMilestone(req, res) {
  try {
    const milestone = await Milestone.findByIdAndDelete(req.params.milestoneId);

    res.json(milestone);
  } catch (error) {
    console.log(error);

    return res.status(500).json(error.errors);
  }
}
