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
          ${state.activities.length == 0
            ? `<p>You do not have any activities logged yet!</p>`
            : `${activityLog(state.activities)}`}
        </div>
        <form class="hidden" id="addActivity">
          <label for="activityDate">Date </label>
          <input type="date" name="date" id="activityDate" />
          <label for="distance">Distance (miles)</label>
          <input type="number" name="count" id="distance" />
          <input class="button" type="submit" value="Add Distance" />
        </form>
        <button id="addDistanceBtn" class="button">Add Distance</button>
      </div>
    </main>
  `;
}

function before(done) {
  axios
    .get(`${process.env.STEPQUEST_API_URL}/activities`, {
      headers: {
        Authorization: store.profile.token
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

function after(router) {
  document.getElementById("addActivity").addEventListener("submit", () => {
    event.preventDefault();

    const requestData = {
      distance: event.target.distance.value,
      date: event.target.date.value
    };

    axios
      .post(`${process.env.STEPQUEST_API_URL}/activities`, requestData, {
        headers: {
          Authorization: store.profile.token
        }
      })
      .then(response => {
        store.log.activities.push(response.data);
        router.resolve();
      })
      .catch(error => console.log("Error adding activity: ", error));

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

  document.getElementById("addDistanceBtn").addEventListener("click", () => {
    const element = document.getElementById("addActivity");
    element.classList.toggle("hidden");
    const button = document.getElementById("addDistanceBtn");
    button.textContent == "Add Distance"
      ? (button.textContent = "Close")
      : (button.textContent = "Add Distance");
  });

  if (document.querySelector(".deleteActivity")) {
    document.querySelectorAll(".deleteActivity").forEach(button =>
      button.addEventListener("click", event => {
        const activityId = event.target.value;

        axios
          .delete(`${process.env.STEPQUEST_API_URL}/activities/${activityId}`, {
            headers: {
              Authorization: store.profile.token
            }
          })
          .then(response => {
            store.log.activities = store.log.activities.filter(
              activity => activity._id != response.data._id
            );
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
