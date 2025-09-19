import html from "html-literal";
// import * as images from "../assets/img";

export default (milestone, isCurrent, imgUrl) => {
  return html`
    <div class="milestone">
      ${isCurrent ? `<img src=${imgUrl} class="milestone-img">` : ""}
      <div class="info">
        <h3>${milestone.name}</h3>
        ${isCurrent
          ? `<h4>Total distance to next milestone: ${milestone.distance}</h4>`
          : ""}
        <p>${milestone.description}</p>
      </div>
    </div>
  `;
};
