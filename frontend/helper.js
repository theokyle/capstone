import { data } from "./assets/data.js";

export function getNextMilestone(milestones) {
  for (let i = 0; i < milestones.length; i++) {
    if (milestones[i].completed === false) {
      return i;
    }
  }
  return milestones.length;
}

export function displayMilestone(parentElement, milestone, currentDistance) {
  const name = document.createElement("h3");
  const description = document.createElement("p");

  name.textContent = milestone.name;
  description.textContent = milestone.description;

  parentElement.appendChild(name);

  if (milestone.distance - currentDistance > 0) {
    const distance = document.createElement("p");
    distance.textContent = milestone.distance - currentDistance;
    parentElement.appendChild(distance);
  }

  parentElement.appendChild(description);
}

export function checkProgress(steps, userMilestones, journeyMilestones) {
  console.log(steps);
  for (let i = 0; i < userMilestones.length; i++) {
    if (
      userMilestones[i].completed === false &&
      journeyMilestones[i].distance < steps
    ) {
      data.user.activeJourneyMilestones[i].completed = true;
    }
  }
  console.log(data.user.activeJourneyMilestones);
}
