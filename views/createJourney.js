import html from "html-literal";
import axios from "axios";
import * as store from "../store/index.js";
import journeyForm from "../components/newJourney/journeyForm.js";
import milestoneForm from "../components/newJourney/milestoneForm.js";
import journeyData from "../components/newJourney/journeyData.js";

function render(state) {
  return html`
    <main>
      <div class="content">
        ${state.currentJourney
          ? `${journeyData(state.currentJourney)}
            ${milestoneForm()}`
          : journeyForm()}
      </div>
    </main>
  `;
}

async function before(done) {
  done();
}

async function after(router) {
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
        .post(`${process.env.STEPQUEST_API_URL}/journeys`, requestData)
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
          `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=${store.tracker.nextMilestone.tag}`
        );

        const requestData = {
          name: inputList.milestoneName.value,
          tag: inputList.tag.value,
          imgUrl: response.data.results[0].urls.small,
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
}

export default {
  render,
  before,
  after
};
