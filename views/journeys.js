import html from "html-literal";
import { data } from "../assets/data.js";

export default () => {
  const currentMilestone =
    data.journeys[data.user.activeJourney - 1].milestones[
      data.user.currentMilestone - 1
    ];
  const progress = Math.floor(
    (data.user.activeJourneySteps / currentMilestone.distance) * 100
  );

  return html`
    <main>
      <div class="content">
        <h1>Journeys</h1>
        <div class="section">
          <h3>Journey to Mt. Doom</h3>
          <p>Current Milestone: ${currentMilestone.name}</p>
          <div class="outer-bar">
            <div class="inner-Bar" id="inner" style="width: ${progress}%">
              ${progress}%
            </div>
          </div>
        </div>
        <a href="/createJourney" data-navigo
          ><button class="button">Create Journey</button></a
        >
      </div>
    </main>
  `;
};
