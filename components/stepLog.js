import html from "html-literal";

export default steps => {
  return html`
    <table class="stepLog">
      <thead>
        <tr>
          <th>Date</th>
          <th>Steps</th>
        </tr>
      </thead>
      <tbody>
        ${steps.map(
          entry => `<tr><td>${entry.date}</td><td>${entry.steps}</td></tr>`
        )}
      </tbody>
    </table>
  `;
};
