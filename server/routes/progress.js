import { Router } from "express";
import { authenticateUser } from "../middleware/auth.js";
import * as progress from "../controllers/progress.js";

const router = Router();
router.use(authenticateUser);

router.get("/", progress.handlerGetProgress);
router.get("/:progressId", progress.handlerGetProgressById);
router.post("/:journeyId", progress.handlerAddJourneyToProgress);
router.delete("/:progressId", progress.handlerDeleteProgressItem);
router.put("/:progressId/currentJourney", progress.handlerSetCurrentJourney);
router.put("/:progressId/addDistance", progress.handlerAddDistance);
router.put("/:progressId/complete", progress.handlerCompleteJourney);

export default router;
