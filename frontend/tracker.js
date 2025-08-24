import { data } from "./assets/data.js";
import { getNextMilestone, displayMilestone, checkProgress } from "./helper.js";

function nextMilestone() {
  const milestones = data.journeys[0].milestones;
  const nextIndex = getNextMilestone(data.user.activeJourneyMilestones);
  const div = document.getElementById("nextMilestone");
  div.innerHTML = "";
  if (nextIndex < milestones.length) {
    displayMilestone(div, milestones[nextIndex], data.user.activeJourneySteps);
  }
}

function previousMilestones() {
  const nextIndex = getNextMilestone(data.user.activeJourneyMilestones);
  const parent = document.getElementById("completedMilestones");
  parent.innerHTML = "";
  for (let i = nextIndex - 1; i >= 0; i--) {
    displayMilestone(parent, data.journeys[0].milestones[i]);
  }
}

document.getElementById("trackerAddSteps").addEventListener("click", event => {
  event.preventDefault();
  data.user.activeJourneySteps += Number(
    document.getElementById("stepNumber").value
  );
  document.getElementById("stepNumber").value = 0;
  checkProgress(
    data.user.activeJourneySteps,
    data.user.activeJourneyMilestones,
    data.journeys[0].milestones
  );
  nextMilestone();
  previousMilestones();
});

nextMilestone();
previousMilestones();
