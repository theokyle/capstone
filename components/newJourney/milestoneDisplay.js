import html from "html-literal";
import milestone from "../milestone.js";
import milestoneForm from "./milestoneForm.js";

export default (milestones, index) => {
  return html`
    <div class="milestone-section">
      ${index > 0
        ? `<button class="button" id="previousMilestoneBtn">
        <i class="fa-solid fa-arrow-left"></i>
      </button>`
        : ""}
      ${index >= milestones.length
        ? milestoneForm()
        : `${milestone(milestones[index], true)}
      <button class="button" id="nextMilestoneBtn">
        <i class="fa-solid fa-arrow-right"></i>
      </button>`}
    </div>
  `;
};
