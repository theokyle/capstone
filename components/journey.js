import html from "html-literal";

export default progress => {
  let currentProgress = Math.floor(
    (progress.totalDistance / progress.journeyId.totalDistance) * 100
  );
  if (currentProgress > 100) {
    currentProgress = 100;
  }

  return html`
    <div class="section">
      <h3>${progress.journeyId.name}</h3>
      <h4>Current Milestone: ${progress.nextMilestone.name}</h4>
      <div class="outer-bar">
        <div class="inner-Bar" id="inner" style="width: ${currentProgress}%">
          ${currentProgress}%
        </div>
      </div>
    </div>
  `;
};
