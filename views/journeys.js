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
        <div>
          <a href="/journeySearch" data-navigo
            ><button class="button">Find a Journey</button></a
          >
          <a href="/createJourney" data-navigo
            ><button class="button">Create Journey</button></a
          >
        </div>
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
          Authorization: store.profile.token
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
                Authorization: store.profile.token
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
              Authorization: store.profile.token
            }
          })
          .then(response => {
            store.journeys.journeys = response.data;
            router.navigate("/journeys");
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
