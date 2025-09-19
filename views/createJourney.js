import html from "html-literal";
import axios from "axios";
import * as store from "../store/index.js";
import journeyForm from "../components/journeyForm";
import milestoneForm from "../components/milestoneForm";

function render() {
  return html`
    <main>
      <div class="content">
        ${journeyForm()} ${milestoneForm()}
      </div>
    </main>
  `;
}

async function after(router) {
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

export default {
  render
};
