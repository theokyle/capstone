import html from "html-literal";

export default () => html`
  <form id="milestoneForm">
    <div class="section">
      <label for="milestoneName">Milestone Name: </label>
      <input type="text" name="milestoneName" id="name" />
      <label for="tag">Milestone Name: </label>
      <input type="text" name="tag" id="tag" />
      <label for="distance">Distance: </label>
      <input type="text" name="distance" id="distance" />
      <label for="milestoneDescription">Description: </label>
      <input
        type="text"
        name="milestoneDescription"
        id="milestoneDescription"
      />
    </div>
    <input type="Submit" value="Save Milestone" class="button" />
  </form>
`;
