import html from "html-literal";
import axios from "axios";
import * as store from "../store/index.js";
import journeyForm from "../components/newJourney/journeyForm.js";
import journeyData from "../components/newJourney/journeyData.js";
import milestoneDisplay from "../components/newJourney/milestoneDisplay.js";

function render(state) {
  return html`
    <main>
      <div class="content">
        ${state.currentJourney
          ? `<div class="section">
          ${journeyData(state.currentJourney)}
          </div>
            ${milestoneDisplay(state.milestones, state.index)}`
          : journeyForm()}
        <button class="button" id="complete">
          ${state.currentJourney ? "Finish Journey" : "Back to Journeys"}
        </button>
      </div>
    </main>
  `;
}

async function before(done) {
  done();
}

async function after(router) {
  document.getElementById("complete").addEventListener("click", () => {
    router.navigate("/journeys");
  });

  if (document.getElementById("journeyForm")) {
    document.getElementById("journeyForm").addEventListener("submit", event => {
      event.preventDefault();

      const inputList = event.target.elements;

      const requestData = {
        name: inputList.journeyName.value,
        universe: inputList.universe.value,
        description: inputList.description.value
      };

      axios
        .post(`${process.env.STEPQUEST_API_URL}/journeys`, requestData, {
          headers: {
            Authorization: store.profile.token
          }
        })
        .then(response => {
          store.createJourney.currentJourney = response.data;
          router.resolve();
        })
        .catch(error => console.log("Error creating journey: ", error));
    });
  }

  if (document.getElementById("milestoneForm")) {
    document
      .getElementById("milestoneForm")
      .addEventListener("submit", async event => {
        event.preventDefault();

        const inputList = event.target.elements;

        const response = await axios.get(
          `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=${inputList.tag.value}`
        );

        let image = response.data.results[0].urls.small;

        const requestData = {
          name: inputList.milestoneName.value,
          tag: inputList.tag.value,
          imgUrl: image,
          distance: inputList.distance.value,
          description: inputList.milestoneDescription.value,
          journeyId: store.createJourney.currentJourney._id
        };

        axios
          .post(`${process.env.STEPQUEST_API_URL}/milestones`, requestData)
          .then(response => {
            store.createJourney.milestones.push(response.data);
            router.resolve();
          })
          .catch(error => console.log("Error creating journey: ", error));
      });
  }

  if (document.getElementById("previousMilestoneBtn")) {
    document
      .getElementById("previousMilestoneBtn")
      .addEventListener("click", () => {
        store.createJourney.index -= 1;
        router.resolve();
      });
  }

  if (document.getElementById("nextMilestoneBtn")) {
    document
      .getElementById("nextMilestoneBtn")
      .addEventListener("click", () => {
        store.createJourney.index += 1;
        router.resolve();
      });
  }
}

export default {
  render,
  before,
  after
};
