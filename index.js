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
    switch (view) {
      case "tracker":
          views.tracker.before(done);
          break;
      case "log":
          views.log.before(done);
          break;
      default :
        done();
    }
  },
  already: (match) => {
    const view = match?.data?.view ? camelCase(match.data.view) : "home";

    render(store[view]);
  },
  after: (match) => {
    router.updatePageLinks();

    const view = match?.data?.view ? camelCase(match.data.view) : "home";

    if (view === "tracker") {
      views.tracker.after();
    }
  }
});

router.on({
  "/": () => render(),
  '/:view': function(match) {
    const view = match?.data?.view ? camelCase(match.data.view) : "home";

    render(store[view]);
  }
}).resolve();
