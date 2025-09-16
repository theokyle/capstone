import Journey from "../models/Journey.js";

export async function handlerGetJourneys(req, res) {
  try {
    const query = req.query;
    const journeys = await Journey.find(query);
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

export async function handlerPostJourney(req, res) {
  try {
    const newJourney = new Journey(req.body);
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
          description: body.description,
          totalDistance: body.totalDistance
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
