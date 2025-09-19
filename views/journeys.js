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

function after(router) {
  if (document.querySelectorAll(".makeActive")) {
    document.querySelectorAll(".makeActive").forEach(button =>
      button.addEventListener("click", event => {
        const progressId = event.target.value;

        axios
          .put(
            `${process.env.STEPQUEST_API_URL}/progress/${progressId}/makeActive`,
            "",
            {
              headers: {
                Authorization: process.env.TEMP_JWT
              }
            }
          )
          .then(() => {
            router.navigate("/tracker");
          });
      })
    );
  }

  if (document.querySelectorAll(".deleteJourney")) {
    document.querySelectorAll(".deleteJourney").forEach(button =>
      button.addEventListener("click", event => {
        const progressId = event.target.value;

        axios
          .delete(`${process.env.STEPQUEST_API_URL}/progress/${progressId}`, {
            headers: {
              Authorization: process.env.TEMP_JWT
            }
          })
          .then(response => {
            store.journeys.journeys = response.data;
            router.resolve();
          });
      })
    );
  }
}

export default {
  render,
  before,
  after
};
