import html from "html-literal";
import nav from "./nav";
import logoImg from "url:../assets/img/logo.png";
import * as store from "../store";

export default state => html`
  <header class="sidebar">
    <div class="logo">
      <a href="/home" data-navigo><img id="logo-img" src="${logoImg}"/></a>
    </div>
    ${store.profile.token ? nav(state.nav) : nav([state.nav[3]])}
  </header>
`;
