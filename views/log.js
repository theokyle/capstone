import html from "html-literal";
import { data } from "../assets/data.js";
import stepLog from "../components/stepLog.js";

export default () => html`
  <main>
    <div class="content">
      <h1>Step Log</h1>

      <div class="section">
        <h2>Daily Steps</h2>
        ${stepLog(data.user.steps)}
      </div>
      <form class="hidden" id="addStepForm">
        <label for="stepDate">Date </label>
        <input type="date" name="stepDate" id="stepDate" />
        <label for="stepCount">Steps </label>
        <input type="number" name="stepCount" id="stepCount" />
      </form>
      <button id="addStepBtn" class="button">Add Steps</button>
    </div>
  </main>
`;
