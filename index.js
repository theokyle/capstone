import { header, main, footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { camelCase } from "lodash";

const router = new Navigo("/");

function render(state = store.home) {
  document.querySelector("#root").innerHTML = `
  ${header(store)}
  ${main(state)}
  ${footer()}`;

  router.updatePageLinks();
}

router.on({
  "/": () => render(),
  '/:view': function(match) {
    const view = match?.data?.view ? camelCase(match.data.view) : "home";

    render(store[view]);
  }
}).resolve();
