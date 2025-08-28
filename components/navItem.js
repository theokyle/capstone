import html from "html-literal";

export default item => {
  return html`
    <li class="nav-item">
      <a href="${item.url}" title=${item.text} data-navigo>
        <i class="${item.faIcon}"></i>
        ${item.text}
      </a>
    </li>
  `;
};
