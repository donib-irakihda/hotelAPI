const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const SECRET_JWT = process.env.SECRET_JWT;

const nodemailer = require("nodemailer");

const register = async (req, res) => {
  //check for existing user
  const { name, email, password } = req.body;

  const sendVerifyMail = async (name, email, userId) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: "on.screen.keyboards@gmail.com",
          pass: "tjeekcazmvpewaku",
        },
      });

      const mailOptions = {
        from: "on.screen.keyboards@gmail.com",
        to: "on.screen.keyboards@gmail.com",
        subject: "For verification",
        html:
          "<p> Hi," +
          name +
          ' please click here to <a href="localhost:8080/api/users/verify?id=' +
          userId +
          '" >Verify </a> your mail. </p>',
      };

      console.log(mailOptions.html);

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: ", info.response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  try {
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json("User already exists with this email ");
    }

    //hashing pass.
    const hashedPassword = await bcrypt.hash(password, 10);

    //user creation
    const result = await UserModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_JWT);

    sendVerifyMail(name, email, result._id);

    res.status(201).json({
      user: result,
      token: token,
      message: "User registration success, check email to verify",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!!" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  //check if not existing user

  try {
    const existingUser = await UserModel.findOne({ email: email });

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found with this email " + email });
    }

    //match password
    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_JWT
    );

    res
      .status(200)
      .json({ message: "Login success", user: existingUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const updatedInfo = await UserModel.updateOne(
      { _id: req.query.id },
      { $set: { isVerified: 1 } }
    );

    console.log(updatedInfo);
    res.status(200).json({ msg: "User is Verified", updatedInfo: updatedInfo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Somthing went wrong while verifying" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    console.log(user);
    res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, login, verifyEmail, getUserById };
