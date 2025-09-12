import User from "../models/users.js";

export async function handlerGetUsers(req, res) {
  try {
    const query = req.query;
    const users = await User.find(query);
    res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
}

export async function handlerLogin(req, res) {
  try {
    const email = req.body.email;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("invalid user");
    }

    const token = Math.floor(Math.random() * 100);
    user.token = token;
    await user.save();

    res.json(user);
  } catch (error) {
    console.log(error);

    if (error.message === "invalid user") {
      return res.status(400).json(error.errors);
    }

    return res.status(500).json(error.errors);
  }
}

export async function handlerPostUser(req, res) {
  try {
    const user = new User(req.body);
    const data = await user.save();
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    if ("name" in error && error.name === "ValidationError")
      return res.status(400).json(error.errors);
    return res.status(500).json(error.errors);
  }
}

export async function handlerDeleteUser(req, res) {
  try {
    const data = await User.findByIdAndDelete(req.params.userId);
    res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
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
    console.log(error);
    if ("name" in error && error.name === "ValidationError")
      return res.status(400).json(error.errors);

    return res.status(500).json(error.errors);
  }
}
