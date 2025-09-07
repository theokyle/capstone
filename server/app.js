import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

// Set up MongoDB Connection
mongoose.connect(process.env.MONGODB);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error:"));
db.once(
  "open",
  console.log.bind(console, "Successfully opened connection to Mongo!")
);

app.get("/", (request, response) => {
  response.send("Welcome to the StepQuest API");
});

//Status check
app.get("/status", (request, response) => {
  response.json({ message: "Service healthy" });
});

//Launch Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
