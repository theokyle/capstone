import html from "html-literal";
import nav from "./nav";
import logoImg from "url:../assets/img/logo.png";

export default state => html`
  <header class="sidebar">
    <div class="logo">
      <a href="/home" data-navigo><img id="logo-img" src="${logoImg}"/></a>
    </div>
    ${nav(state.nav)}
  </header>
`;
