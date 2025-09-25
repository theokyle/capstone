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
          ${state.journeyName
            ? `<h2>${state.journeyName}</h2>
          ${milestone(state.nextMilestone, true)}`
            : `<h2>Your Journey Begins</h2>
          <p>You have do not currently have an active journey. It's time to find a new journey or create
          one of your own!</p>
          <a href="/journeys" data-navigo><button class="button">Find a Journey</button></a>`}
        </div>

        ${state.milestonesCompleted.length > 0
          ? `<div class="section">
          <h2>Milestones Achieved</h2>
          ${state.milestonesCompleted.map(ms => milestone(ms, false)).join("")}
        </div>`
          : ""}

        <div class="section">
          <h2>Add Distance</h2>
          <form id="addStep" method="POST">
            <input
              type="number"
              placeholder="Distance traveled..."
              name="distance"
              id="distance"
            />
            <input
              type="submit"
              value="Submit"
              id="submit"
              name="submit"
              class="button"
            />
          </form>
          <button id="reset" class="button">Reset Progress</button>
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
          Authorization: store.profile.token
        }
      }
    );
    if (response.data) {
      store.tracker.journeyName = response.data.journeyId.name;
      store.tracker.nextMilestone = response.data.nextMilestone;
      store.tracker.milestonesCompleted = response.data.milestonesCompleted;
    }
    done();
  } catch (error) {
    console.log(error);
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
            Authorization: store.profile.token
          }
        }
      )
      .then(() => {
        router.resolve();
      })
      .catch(error => {
        console.log("Error adding steps: ", error);
      });
  });

  document.getElementById("reset").addEventListener("click", event => {
    axios
      .put(`${process.env.STEPQUEST_API_URL}/progress/resetProgress`, "", {
        headers: {
          Authorization: store.profile.token
        }
      })
      .then(() => router.resolve())
      .catch(error => console.log("Error resetting progress: ", error));
  });
}

export default {
  render,
  before,
  after
};
