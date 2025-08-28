import html from "html-literal";
import oldForestImg from "url:../assets/milestone-img/old-forest.png";

export default (milestone, isCurrent) => {
  return html`
    <div class="milestone">
      ${isCurrent ? `<img src=${oldForestImg} class="milestone-img">` : ``}
      <div class="info">
        <h3>${milestone.name}</h3>
        <p>${milestone.description}</p>
      </div>
    </div>
  `;
};
