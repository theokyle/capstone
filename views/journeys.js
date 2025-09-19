import html from "html-literal";
import axios from "axios";
import * as store from "../store";
import journey from "../components/journey.js";

function render(state) {
  return html`
    <main>
      <div class="content">
        <h1>Journeys</h1>
        ${state.journeys.map(progress => journey(progress)).join("")}
        <a href="/createJourney" data-navigo
          ><button class="button">Create Journey</button></a
        >
      </div>
    </main>
  `;
}

async function before(done) {
  try {
    let response = await axios.get(
      `${process.env.STEPQUEST_API_URL}/progress`,
      {
        headers: {
          Authorization: process.env.TEMP_JWT
        }
      }
    );

    store.journeys.journeys = response.data;

    done();
  } catch (error) {
    console.log(error);
    done();
  }
}

function after(router) {}

export default {
  render,
  before,
  after
};
