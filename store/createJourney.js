export default {
  view: "createJourney",
  currentJourney: null,
  milestones: [],
  index: 0,
  reset() {
    this.currentJourney = null;
    this.milestones = [];
    this.index = 0;
  }
};
