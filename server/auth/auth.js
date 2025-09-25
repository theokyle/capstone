import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET;

export async function authenticateUser(req, res, next) {
  try {
    if (!req.headers.authorization) {
      res.status(401).json({ error: "No authorization provided" });
      return;
    }

    const token = req.headers.authorization;

    const decoded = jwt.verify(token, secret);

    const user = await User.findById(decoded.userId);
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ error: `Unable to authenticate user: ${error}` });
    return;
  }
}

export async function handlerLogin(req, res) {
  try {
    const email = req.body.email;

    //Find user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("invalid user");
    }

    //Create JWT and add to User model
    const token = jwt.sign({ userId: user.id }, secret, {
      algorithm: "HS256"
    });
    user.token = token;
    const data = await user.save();

    //Respond with the created token
    res.json(data);
  } catch (error) {
    if (error.message === "invalid user") {
      res.status(400).json(error.errors);
    }

    res.status(500).json({ message: error.message });
  }
}
