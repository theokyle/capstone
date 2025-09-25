import html from "html-literal";
import axios from "axios";
import * as store from "../store";

function render(state) {
  return html`
    <main>
      <div class="content">
        <h1>User Profile</h1>
        <div class="section">
          ${state.token
            ? `<h2>User</h2>
          <p>UserName: ${state.email}</p>
          <button id="logout" class="button">Logout</button>`
            : `
          <h3>Please Login or Register a New Account</h3>
          <div id="message"></div>
          <form id="login" method="POST">
            <div>
          <label for="userEmail">Email:</label>
          <input type="email" name="email" id="userEmail" required></input>
          </div>
          <div>
            <input type="submit" name="register" value="register" class="button" id="registerBtn"></input>
            <input type="submit" name="signin" value="signin" class="button" id="signInBtn"></input>
          </div>
          </form>`}
        </div>
        <button id="fitbit" class="button">Sync with Fitbit</button>
      </div>
    </main>
  `;
}

function before(done) {
  done();
}

function after(router) {
  if (document.querySelector("#logout")) {
    document.querySelector("#logout").addEventListener("click", () => {
      store.profile.token = "";
      router.resolve();
    });
  }
  if (document.querySelector("#login")) {
    document.querySelector("#login").addEventListener("submit", event => {
      event.preventDefault();

      const requestData = {
        email: event.target.elements.email.value
      };

      if (event.submitter.id == "registerBtn") {
        axios
          .post(`${process.env.STEPQUEST_API_URL}/users/`, requestData)
          .then(response => {
            store.profile.token = response.data.token;
            store.profile.email = response.data.email;
            router.navigate("/tracker");
          })
          .catch(error => {
            console.log("Error creating user", error);
          });
      }

      if (event.submitter.id == "signInBtn") {
        axios
          .post(`${process.env.STEPQUEST_API_URL}/users/login/`, requestData)
          .then(response => {
            store.profile.token = response.data.token;
            store.profile.email = response.data.email;
            router.navigate("/tracker");
          })
          .catch(error => {
            displayMessage("Unable to Sign In. Email not found.", "red");
            console.log("Error logging in", error);
          });
      }
    });
  }
}

function displayMessage(message, color) {
  const messageElement = document.getElementById("message");
  messageElement.innerHTML = message;
  messageElement.style.color = color;
}

export default {
  render,
  before,
  after
};
