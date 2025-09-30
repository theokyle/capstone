export default {
  view: "tracker",
  image: "",
  journeyName: "",
  nextMilestone: {},
  milestonesCompleted: [],
  reset() {
    this.image = "";
    this.journeyName = "";
    this.nextMilestone = {};
    this.milestonesCompleted = [];
  }
};
