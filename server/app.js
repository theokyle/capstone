import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import journeys from "./routes/journeys.js";
import users from "./routes/users.js";
import activities from "./routes/activity.js";
import progress from "./routes/progress.js";

dotenv.config();

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());

// Set up MongoDB Connection
mongoose.connect(process.env.MONGODB);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error:"));
db.once(
  "open",
  console.log.bind(console, "Successfully opened connection to Mongo!")
);

//admin routes
app.get("/", (request, response) => {
  response.send("Welcome to the StepQuest API");
});
app.get("/status", (request, response) => {
  response.json({ message: "Service healthy" });
});

//routes
app.use("/journeys", journeys);
app.use("/users", users);
app.use("/activities", activities);
app.use("/progress", progress);

//Launch Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
