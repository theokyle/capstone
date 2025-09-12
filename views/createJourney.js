import html from "html-literal";
import journeyForm from "../components/journeyForm";
import milestoneForm from "../components/milestoneForm";

export default () => html`
  <main>
    <div class="content">
      ${journeyForm()} ${milestoneForm()}
    </div>
  </main>
`;
