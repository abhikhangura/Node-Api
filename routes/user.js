import express from "express";
import User from "../model/User.js";

const userRouter = express.Router();

userRouter.get("/user/:name", async (req, res) => {
  const email = req.params.name;
  let username_exist = await User.findOne({ email: email });
  if (username_exist) {
    res.status(201).send(username_exist);
  } else {
    res.status(400).json({
      success: false,
      msg: "Not data found!",
    });
  }
});

userRouter.post("/verifyUser", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  let user = await User.findOne({ email: email });

  if (user) {
    if (user.password === password) {
      res.status(201).json({
        success: true,
        msg: "Login Successfull",
      });
    } else {
      res.status(400).json({
        success: false,
        msg: "Incorrect password. Try again!",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      msg: "Incorrect username. Try again!",
    });
  }
});

userRouter.get("/allUsers", async (_req, res) => {
  let users = await User.find();
  if (users != null) {
    res.status(201).send(users);
  } else {
    res.status(400).json({
      success: false,
      msg: "Not data found",
    });
  }
});

userRouter.post("/registerUser", async (req, res) => {
  const {
    name,
    email,
    phoneNumber,
    street,
    city,
    state,
    pin,
    password,
    access,
  } = req.body;

  try {
    let username_exist = await User.findOne({ email: email });

    if (username_exist) {
      res.status(400).json({
        success: false,
        msg: "Username already exist!!",
      });
    } else {
      const userDoc = new User({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        address: {
          street: street,
          city: city,
          state: state,
          pin: pin,
        },
        password: password,
        access: access,
      });

      await userDoc.save().catch((err) => {
        console.log(err);
        res.status(500).json({
          success: false,
          msg: `Database error ${err}`,
        });
      });

      res.status(201).json({
        success: true,
        msg: "User registered successfully!!",
        user: userDoc,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

export default userRouter;
