import html from "html-literal";
import navItem from "./navItem";

export default navItems => {
  return html`
    <nav>
      <ul>
        ${navItems.map(item => navItem(item)).join("")}
      </ul>
    </nav>
  `;
};
