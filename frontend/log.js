import { data } from "./assets/data.js";

const log = document.getElementById("stepLog");
function updateLog() {
  log.innerHTML = "";
  const table = document.createElement("table");
  table.innerHTML = `<tr><th>Date</th><th>Steps</th></tr>`;
  log.appendChild(table);
  data.user.steps.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${item.date}</td><td>${item.steps}</td>`;
    table.appendChild(tr);
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
