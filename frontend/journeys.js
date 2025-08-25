import { data } from "./assets/data.js";
import { getNextMilestone } from "./helper.js";

const nextMilestone = document.getElementById("nextMilestone");
const nextIndex = getNextMilestone(data.user.activeJourneyMilestones);
nextMilestone.textContent = `Next Milestone: ${data.journeys[0].milestones[nextIndex].name}`;

const inner = document.getElementById("inner");
const progress = Math.floor(
  (data.user.activeJourneySteps /
    data.journeys[0].milestones[nextIndex].distance) *
    100
);
inner.style.width = `${progress}%`;
inner.textContent = `${progress}%`;
