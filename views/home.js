import html from "html-literal";

function render() {
  return html`
    <main>
      <div class="hero">
        <h1>StepQuest</h1>
        <form>
          <input type="email" id="email" placeholder="Enter your email..." />
          <input type="submit" value="Sign up Today!" class="button" />
        </form>
      </div>
      <div class="content">
        <div class="about">
          <h2>About StepQuest</h2>
          <p>
            Journey to Mt. Doom, hike the Appalachian Trail, or travel across
            the world from your favorite series of books while getting healthy
            and active! StepQuest is an app which takes your steps in the real
            world gathered from your favorite step-tracking device (or simply
            typed into the app) and calculates your distance along a virtual
            journey of your dreams. Create a custom journey to add your own
            favorite journey or choose from one created by another user. Get
            fit, have fun, and explore new worlds!
          </p>
          <h2>Features</h2>
          <h3>Create Your Own Journey</h3>
          <p>
            Create your own custom quest through our simple user interface. Add
            as many or as few destinations as you like and get walking!
          </p>
          <h3>Track Your Progress</h3>
          <p>
            StepQuest gathers step information from your favorite step counter
            (such as a watch or your phone) and calculates your progress along a
            virtual journey. Each step you take in the real world translates to
            a virtual step toward your favorite destination. StepQuest
            visualizes your progress as well as well as the distance to your
            next destination.
          </p>
          <h3>Reach New Destinations</h3>
          <p>
            Reach new destinations to learn more about them and earn
            achievements.
          </p>
          <h3>Stay Active While Having Fun!</h3>
          <p>
            StepQuest encourages you to live an active and healthy lifestyle
            while having fun traveling through the worlds of your favorite
            books, tv series, movie, or travel destination in the real world.
          </p>
        </div>
      </div>
    </main>
  `;
}

function before(done) {
  done();
}

function after(router) {}

export default {
  render,
  before,
  after
};
