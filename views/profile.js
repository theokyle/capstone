import html from "html-literal";
import { data } from "../assets/data.js";

export default () => html`
  <main>
    <div class="content">
      <h1>User Profile</h1>

      <div class="section">
        <h2>User</h2>
        <p>UserName: ${data.user.username}</p>
      </div>
      <button id="fitbit" class="button">Sync with Fitbit</button>
    </div>
  </main>
`;
