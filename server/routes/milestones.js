import { Router } from "express";
import * as milestones from "../controllers/milestones.js";

const router = Router();

router.post("/", milestones.handlerCreateMilestone);

router.get("/", milestones.handlerGetMilestones);

router.get("/:milestoneId", milestones.handlerGetMilestoneById);

router.put("/:milestoneId", milestones.handlerUpdateMilestone);

router.delete("/:milestoneId", milestones.handlerDeleteMilestone);

export default router;
