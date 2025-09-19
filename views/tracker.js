import html from "html-literal";
import milestone from "../components/milestone.js";
import * as store from "../store";
import axios from "axios";

function render(state) {
  return html`
    <main>
      <div class="content">
        <h1>Journey Tracker</h1>
        <div class="section">
          <h2>Next Milestone Info</h2>
          ${milestone(store.tracker.nextMilestone, true, state.image)}
        </div>

        ${store.tracker.milestonesCompleted.length > 0
          ? `<div class="section">
          <h2>Milestones Achieved</h2>
          ${store.tracker.milestonesCompleted.map(ms => milestone(ms, false))}
        </div>`
          : ``}

        <div class="section">
          <h2>Daily Step Entry</h2>
          <form id="addStep" method="POST">
            <input
              type="number"
              placeholder="# of Steps"
              name="distance"
              id="distance"
            />
            <input
              type="submit"
              value="Add Steps"
              id="submit"
              name="submit"
              class="button"
            />
          </form>
        </div>
      </div>
    </main>
  `;
}

async function before(done) {
  try {
    let response = await axios.get(
      `${process.env.STEPQUEST_API_URL}/progress/active`,
      {
        headers: {
          Authorization: process.env.TEMP_JWT
        }
      }
    );

    store.tracker.nextMilestone = response.data.nextMilestone;
    store.tracker.milestonesCompleted = response.data.milestonesCompleted;

    response = await axios.get(
      `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=${store.tracker.nextMilestone.tags[0]}`
    );

    store.tracker.image = response.data.results[0].urls.small;
    done();
  } catch (error) {
    console.log("Failed to retrieve image:", error);
    done();
  }
}

async function after(router) {
  document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();

    const inputList = event.target.elements;

    const requestData = {
      distance: inputList.distance.value
    };

    axios
      .put(
        `${process.env.STEPQUEST_API_URL}/progress/addDistance`,
        requestData,
        {
          headers: {
            Authorization: process.env.TEMP_JWT
          }
        }
      )
      .then(() => {
        window.location.reload(true);
      })
      .catch(error => {
        console.log("Error adding steps: ", error);
      });
  });
}

export default {
  render,
  before,
  after
};
