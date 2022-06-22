import express from "express";
import Admin from "../model/Admin.js";
import admin from "../model/Admin.js";

const adminRouter = express.Router();

adminRouter.post("/verifyAdmin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const admin = await Admin.findOne({ email: email });

  if (admin) {
    if (admin.password === password) {
      res.status(201).send(admin);
    } else {
      res.status(401).json({
        status: false,
        msg: "Invaid password..",
      });
    }
  } else {
    res.status(401).json({
      status: false,
      msg: "Invalid Username.",
    });
  }
});

export default adminRouter;
