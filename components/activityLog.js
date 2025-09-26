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
        ${activities.map(entry => {
          const date = new Date(entry.date);
          return `<tr>
          <td>${date.toDateString()}</td>
          <td>${
            entry.distance
          }</td><td class="clear"><button class="button deleteActivity" value="${
            entry._id
          }">Delete Activity</button></td></tr>`;
        })}
      </tbody>
    </table>
  `;
};
