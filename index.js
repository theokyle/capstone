import { header, main, footer } from "./components";
import * as store from "./store";
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
        axios
          .get(`https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=forest`)
          .then(response => {
            store.tracker.image = response.data.results[0].urls.small;
            done();
          })
          .catch((error) => {
            console.log("Failed to retrieve image:", error);
            done();
          });
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
  }
});

router.on({
  "/": () => render(),
  '/:view': function(match) {
    const view = match?.data?.view ? camelCase(match.data.view) : "home";

    render(store[view]);
  }
}).resolve();
