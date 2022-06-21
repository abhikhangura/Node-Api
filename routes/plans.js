import express from "express";
import Plans from "../model/Plans";

const plansRouter = express.Router();

plansRouter.get("/getPlans", async (_req, res) => {
  let plans = await Plans.find();

  if (plans != null) {
    res.status(201).send(plans);
  } else {
    res.status(400).send("Problem getting plans");
  }
});
