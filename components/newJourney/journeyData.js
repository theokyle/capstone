import html from "html-literal";

export default journey => {
  return html`
    <div class="section">
      <h3>${journey.name}</h3>
      <h4>Universe:</h4>
      <p>${journey.universe}</p>
      <h4>Description</h4>
      <p>${journey.description}</p>
    </div>
  `;
};
