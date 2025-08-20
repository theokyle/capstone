import { data } from "./assets/data.js";

const log = document.getElementById("step-log");
function updateLog() {
  log.innerHTML = "";
  data.user.steps.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="date">${item.date}</span> : <span>${item.steps}</span>`;
    log.appendChild(li);
  });
}
updateLog();

const addStepBtn = document.getElementById("addStepBtn");
function addStep(event) {
  if (addStepBtn.textContent === "Submit") {
    data.user.steps.push({
      date: document.getElementById("stepDate").value,
      steps: document.getElementById("stepCount").value
    });
    updateLog();
  }
  addStepBtn.textContent =
    addStepBtn.textContent === "Add Steps" ? "Submit" : "Add Steps";
  document.getElementById("addStepForm").classList.toggle("hidden");
}
addStepBtn.addEventListener("click", addStep);
