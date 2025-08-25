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
  const container = document.createElement("div");
  container.classList.add("milestone");
  const info = document.createElement("div");
  info.classList.add("info");

  const name = document.createElement("h3");
  const description = document.createElement("p");
  const img = document.createElement("img");

  name.textContent = milestone.name;
  description.textContent = milestone.description;
  img.src = milestone.imgURL;
  img.classList.add("milestone-img");

  info.appendChild(name);

  if (milestone.distance - currentDistance > 0) {
    const distance = document.createElement("p");
    distance.textContent = `Steps to destination: ${milestone.distance -
      currentDistance}`;
    info.appendChild(distance);
    container.appendChild(img);
  }
  info.appendChild(description);

  container.appendChild(info);
  parentElement.appendChild(container);
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
