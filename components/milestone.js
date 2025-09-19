import html from "html-literal";

export default (milestone, isCurrent) => {
  return html`
    <div class="milestone">
      ${isCurrent ? `<img src=${milestone.imgUrl} class="milestone-img">` : ""}
      <div class="info">
        <h3>${milestone.name}</h3>
        ${isCurrent
          ? `<h4>Total distance to next milestone: ${milestone.distance} miles</h4>`
          : ""}
        <p>${milestone.description}</p>
      </div>
    </div>
  `;
};
