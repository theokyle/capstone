import html from "html-literal";

export default () => html`
  <form id="milestoneForm">
    <label for="milestoneName">Milestone Name: </label>
    <input type="text" name="milestoneName" id="name" />
    <!-- <label for="imgUrl">Image URL (optional):</label>
    <input type="text" name="imgUrl" id="imgUrl" /> -->
    <label for="tag">Image Tag: </label>
    <input type="text" name="tag" id="tag" />
    <label for="distance">Distance (miles): </label>
    <input type="number" name="distance" id="distance" />
    <label for="milestoneDescription">Description: </label>
    <input type="text" name="milestoneDescription" id="milestoneDescription" />
    <input type="Submit" value="Save Milestone" class="button" />
  </form>
`;
