import { Router } from "express";
import * as users from "../controllers/users.js";
import { handlerLogin } from "../auth/auth.js";

const router = Router();

//Create a new user
router.post("/", users.handlerPostUser);

//Login a user
router.post("/login/", handlerLogin);

//Get users
router.get("/", users.handlerGetUsers);

//Update a User
router.put("/:userId", users.handlerUpdateUser);

//Delete a User
router.delete("/:userId", users.handlerDeleteUser);

export default router;
