import html from "html-literal";
import journeyForm from "../components/journeyForm";
import milestoneForm from "../components/milestoneForm";

function render() {
  return html`
    <main>
      <div class="content">
        ${journeyForm()} ${milestoneForm()}
      </div>
    </main>
  `;
}

export default {
  render
};
