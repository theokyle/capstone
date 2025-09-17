import * as views from "../views";

export default state => `${views[state.view].render(state)}`;
