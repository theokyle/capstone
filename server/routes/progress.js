import { Router } from "express";
import { authenticateUser } from "../auth/auth.js";
import * as progress from "../controllers/progress.js";

const router = Router();
router.use(authenticateUser);

router.get("/", progress.handlerGetAllProgress);
router.get("/active", progress.handlerGetActiveProgress);
router.get("/:progressId", progress.handlerGetProgressById);
router.post("/:journeyId", progress.handlerAddJourneyToProgress);
router.delete("/:progressId", progress.handlerDeleteProgressItem);
router.put("/:progressId/makeActive", progress.handlerMakeActive);
router.put("/addDistance", progress.handlerAddDistance);
router.put("/resetProgress", progress.handlerResetProgress);

export default router;
