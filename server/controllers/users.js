import User from "../models/User.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { handlerLogin } from "../auth/auth.js";

dotenv.config();

const secret = process.env.JWT_SECRET;

export async function handlerGetUsers(req, res) {
  try {
    const query = req.query;
    const users = await User.find(query);
    res.json(users);
  } catch (error) {
    res.status(500).json(error.errors);
  }
}

export async function handlerPostUser(req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return handlerLogin(req, res);
    }

    user = new User(req.body);

    //login the newly created user
    const token = jwt.sign({ userId: user.id }, secret, {
      algorithm: "HS256"
    });
    user.token = token;

    const data = await user.save();
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    if ("name" in error && error.name === "ValidationError")
      res.status(400).json(error.errors);
    res.status(500).json(error.errors);
  }
}

export async function handlerDeleteUser(req, res) {
  try {
    const data = await User.findByIdAndDelete(req.params.userId);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.errors);
  }
}

export async function handlerUpdateUser(req, res) {
  try {
    const body = req.body;
    const data = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: body.username,
          email: body.email
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    res.json(data);
  } catch (error) {
    if ("name" in error && error.name === "ValidationError")
      res.status(400).json(error.errors);

    res.status(500).json(error.errors);
  }
}
