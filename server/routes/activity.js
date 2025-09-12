import { Router } from "express";
import { authenticateUser } from "../middleware/auth.js";
import * as activities from "../controllers/activity.js";

const router = Router();
router.use(authenticateUser);

router.get("/", activities.handlerGetActivities);
router.post("/", activities.handlerPostActivity);
router.delete("/:activityId", activities.handlerDeleteActivity);
router.put("/:activityId", activities.handlerUpdateActivity);

export default router;
