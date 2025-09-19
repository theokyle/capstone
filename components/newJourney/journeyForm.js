import html from "html-literal";

export default () => html`
  <h1>Create a Journey</h1>
  <form id="journeyForm">
    <div class="section">
      <label for="journeyName">Journey Name: </label>
      <input
        type="text"
        name="journeyName"
        id="journeyName"
        placeholder="Journey to Mount Doom"
      />
      <label for="universe">Universe: </label>
      <input
        type="text"
        name="universe"
        id="universe"
        placeholder="Middle Earth"
      />
      <label for="description">Description: </label>
      <input
        type="text"
        name="description"
        id="description"
        placeholder="Walk from the Shire to Mount
      Doom to destroy the One Ring and save Middle Earth."
      />
    </div>
    <input type="Submit" value="Save Journey" class="button" />
  </form>
`;
