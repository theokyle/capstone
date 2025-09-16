import User from "../models/User.js";

export async function authenticateUser(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "No authorization provided" });
  }

  const token = req.headers.authorization;
  const user = await User.findOne({ token: token });
  if (!user) {
    return res.status(400).json({ error: "Unable to authenticate user" });
  }

  req.user = user;
  next();
}
