import html from "html-literal";
// import * as images from "../assets/img";

export default (milestone, isCurrent, imgUrl) => {
  return html`
    <div class="milestone">
      ${isCurrent ? `<img src=${imgUrl} class="milestone-img">` : ``}
      <div class="info">
        <h3>${milestone.name}</h3>
        <p>${milestone.description}</p>
      </div>
    </div>
  `;
};
