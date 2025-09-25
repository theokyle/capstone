import html from "html-literal";
import axios from "axios";
import * as store from "../store/index.js";
import journeyData from "../components/newJourney/journeyData.js";

function render(state) {
  return html`
    <main>
      <div class="content">
        <h1>Journeys</h1>
        ${state.journeys
          .map(journey => {
            return `
            <div class="section">
              ${journeyData(journey)}
              ${
                store.profile.token
                  ? `<button class="button enroll" value=${journey._id}>Start Journey</button>`
                  : ""
              }
            </div>`;
          })
          .join("")}
        <div>
          ${store.profile.token
            ? `<a href="/journeys" data-navigo><button class="button">My Journeys</button></a>`
            : ""}
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
    let response = await axios.get(`${process.env.STEPQUEST_API_URL}/journeys`);

    store.journeySearch.journeys = response.data;

    done();
  } catch (error) {
    console.log(error);
    done();
  }
}

function after(router) {
  if (document.querySelectorAll(".enroll")) {
    document.querySelectorAll(".enroll").forEach(button =>
      button.addEventListener("click", event => {
        const journeyId = event.target.value;
        axios
          .post(`${process.env.STEPQUEST_API_URL}/progress/${journeyId}`, "", {
            headers: {
              Authorization: store.profile.token
            }
          })
          .then(() => {
            router.navigate("/tracker");
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
