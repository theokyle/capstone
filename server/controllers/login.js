import User from "../models/User.js";

export async function handlerLogin(req, res) {
  try {
    const email = req.body.email;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("invalid user");
    }

    const token = 17;
    user.token = token;
    await user.save();

    res.json(token);
  } catch (error) {
    if (error.message === "invalid user") {
      res.status(400).json(error.errors);
    }

    res.status(500).json(error.errors);
  }
}
