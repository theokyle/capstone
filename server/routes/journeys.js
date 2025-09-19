import { Router } from "express";
import { authenticateUser } from "../auth/auth.js";
import * as journeys from "../controllers/journeys.js";

const router = Router();

//Journey Routes

router.get("/", journeys.handlerGetJourneys);
router.get("/:journeyId", journeys.handlerGetJourneyById);
router.post("/", authenticateUser, journeys.handlerCreateJourney);
router.delete("/:journeyId", journeys.handlerDeleteJourney);
router.put("/:id", journeys.handlerUpdateJourney);
router.get("/:journeyId/milestones", journeys.handlerGetJourneyMilestones);
router.put(
  "/:journeyId/addMilestone/:milestoneId",
  journeys.handlerAddMilestone
);

export default router;
