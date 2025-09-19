import html from "html-literal";
import { data } from "../assets/data.js";

function render() {
  return html`
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
}

function before(done) {
  done();
}

function after(router) {}

export default {
  render,
  before,
  after
};
