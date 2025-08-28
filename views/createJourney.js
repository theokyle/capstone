import html from "html-literal";

export default () => html`
  <main>
    <div class="content">
      <h1>Create a Journey</h1>
      <form>
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
        <div class="section">
          <label for="milestoneName">Milestone Name: </label>
          <input type="text" name="milestoneName" id="milestoneName" />
          <label for="distance">Distance: </label>
          <input type="text" name="distance" id="distance" />
          <label for="milestoneDescription">Description: </label>
          <input
            type="text"
            name="milestoneDescription"
            id="milestoneDescription"
          />
        </div>
        <div>
          <button class="button">Add Milestone</button>
          <input type="Submit" value="Save Journey" class="button" />
        </div>
      </form>
    </div>
  </main>
`;
