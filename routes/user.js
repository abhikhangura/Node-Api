import express from "express";
import User from "../model/User.js";

const userRouter = express.Router();

userRouter.get("/user/:name", async (req, res) => {
  const username = req.params.name;
  let username_exist = await User.findOne({ username: username });
  if (username_exist) {
    res.status(201).send(username_exist);
  } else {
    res.status(400).json({
      success: false,
      msg: "Not data found",
    });
  }
});


userRouter.post("/verifyUser", async (req, res) => {
  const username = req.params.username
  const password = req.params.password
  console.log(username, password);
  let user = await User.findOne({username: username})

  if(user){
    if (user.password === password){
      res.status(201).json({
        success: true,
        msg: "Login Successfull",
      })
    }
    else{
        res.status(400).json({
          success: false,
          msg: "Incorrect password. Try again!",
        })
    }
  }
  else{
    res.status(400).json({
      success: false,
      msg: "Incorrect email. Try again!",
    })
  }
});

userRouter.get("/allUsers", async (req, res) => {
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
  const { username, name, email, phoneNumber, address, password, access } =
    req.body;

  try {
    let username_exist = await User.findOne({ username: username });

    if (username_exist) {
      res.status(400).json({
        success: false,
        msg: "Username already exist!!",
      });
    } else {

      const userDoc = new User({
        username: username,
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        address: {
          street: address.street,
          city: address.city,
          state: address.state,
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
        msg: "User registered successfully !!",
        user: userDoc,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

export default userRouter;
