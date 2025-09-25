import { header, main, footer } from "./components";
import * as store from "./store";
import * as views from "./views";
import Navigo from "navigo";
import { camelCase } from "lodash";
import axios from "axios";

const router = new Navigo("/");

function render(state = store.home) {
  document.querySelector("#root").innerHTML = `
  ${header(store)}
  ${main(state)}
  ${footer()}`;
}

router.hooks({
  before: (done, match) => {
    const view = match?.data?.view ? camelCase(match.data.view) : "home";
    views[view].before(done);
  },
  already: async (match) => {
  router.updatePageLinks();
  const view = match?.data?.view ? camelCase(match.data.view) : "home";

  await new Promise(res => views.tracker.before(res))
  render(store[view]);
  views[view].after(router);

  },
  after: (match) => {
    router.updatePageLinks();

    const view = match?.data?.view ? camelCase(match.data.view) : "home";
    views[view].after(router);

  }
});

router.on({
  "/": () => render(),
  '/:view': function(match) {
    const view = match?.data?.view ? camelCase(match.data.view) : "home";
    render(store[view]);
  }
}).resolve();
