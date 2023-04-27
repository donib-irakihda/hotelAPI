const express = require("express");
const {
  register,
  login,
  verifyEmail,
  getUserById,
} = require("../controller/userController");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("Register Here");
});

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.get("/verify", verifyEmail);

userRouter.get("/getById/:id", getUserById);

module.exports = userRouter;
