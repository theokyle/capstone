import { Router } from "express";
import * as journeys from "../controllers/journeys.js";
import * as milestones from "../controllers/milestones.js";

const router = Router();

//Journey Routes

//GET All Journeys
router.get("/", journeys.handlerGetJourneys);

//GET Journey by ID
router.get("/:journeyId", journeys.handlerGetJourneyById);

//POST a New Journey
router.post("/", journeys.handlerPostJourney);

//DELETE a Journey
router.delete("/:journeyId", journeys.handlerDeleteJourney);

//UPDATE a Journey
router.put("/:id", journeys.handlerUpdateJourney);

//Get All Milestones for a journey
router.get("/:journeyId/milestones", milestones.handlerGetMilestones);

//Get Milestone by ID
router.get(
  "/:journeyId/milestones/:milestoneId",
  milestones.handlerGetMilestoneById
);

//Add a new milestone
router.put("/:journeyId/milestones/", milestones.handlerAddMilestone);

//Edit an existing milestone
router.put(
  "/:journeyId/milestones/:milestoneId",
  milestones.handlerUpdateMilestone
);

router.delete(
  "/:journeyId/milestones/:milestoneId",
  milestones.handlerDeleteMilestone
);

export default router;
