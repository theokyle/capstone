import html from "html-literal";
import activityLog from "../components/activityLog.js";
import axios from "axios";
import * as store from "../store";

function render(state) {
  return html`
    <main>
      <div class="content">
        <h1>Activity Log</h1>

        <div class="section">
          <h2>Daily activities</h2>
          ${activityLog(state.activities)}
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
}

function before(done) {
  axios
    .get(`${process.env.STEPQUEST_API_URL}/activities`, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGM0NmY0ODU4MmYwNmZhMmFiOTI5ODUiLCJpYXQiOjE3NTgxMzQ1Mzd9.-lj0uww25CKRS-kHePNrHeCg_Mli-aoIDhBNtBJPNQM"
      }
    })
    .then(response => {
      store.log.activities = response.data;
      done();
    })
    .catch(error => {
      console.log("Failed to retrieve image:", error);
      done();
    });
}

export default {
  render,
  before
};
