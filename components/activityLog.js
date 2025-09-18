import html from "html-literal";

export default activities => {
  return html`
    <table class="stepLog">
      <thead>
        <tr>
          <th>Date</th>
          <th>Distance</th>
        </tr>
      </thead>
      <tbody>
        ${activities.map(
          entry => `<tr><td>${entry.date}</td><td>${entry.distance}</td></tr>`
        )}
      </tbody>
    </table>
  `;
};
