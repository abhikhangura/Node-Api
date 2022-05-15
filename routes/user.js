import express from "express";
import bcryptjs from "bcryptjs";
import User from "../model/User.js";

const userRouter = express.Router();

userRouter.get("/allUsers", async (req, res) => {
  const {username} = req.body
  let user = await User.findOne({username:username});
  console.log(user);
  res.status(201).send(user)
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
      // Initialize the encryption for password
      const salt = await bcryptjs.genSalt(10);
      const pass = await bcryptjs.hash(password, salt);

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
        password: pass,
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
