import html from "html-literal";
import { data } from "../assets/data.js";
import milestone from "../components/milestone.js";

export default () => {
  //Will refactor at a later stage to get these values from state instead of the data import
  const currentMilestone =
    data.journeys[data.user.activeJourney - 1].milestones[
      data.user.currentMilestone - 1
    ];

  const previousMilestones = [];
  for (let i = data.user.currentMilestone - 2; i >= 0; i--) {
    previousMilestones.push(
      data.journeys[data.user.activeJourney - 1].milestones[i]
    );
  }

  return html`
    <main>
      <div class="content">
        <h1>Journey Tracker</h1>
        <div class="section">
          <h2>Next Milestone Info</h2>
          ${milestone(currentMilestone, true)}
        </div>

        <div class="section">
          <h2>Milestones Achieved</h2>
          ${previousMilestones.map(ms => milestone(ms, false))}
        </div>

        <div class="section">
          <h2>Daily Step Entry</h2>
          <form>
            <input type="number" placeholder="# of Steps" id="stepNumber" />
            <input
              type="submit"
              value="Add Steps"
              id="trackerAddSteps"
              class="button"
            />
          </form>
        </div>
      </div>
    </main>
  `;
};
