import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import journeys from "./routes/journeys.js";

dotenv.config();

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

//Launch Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
