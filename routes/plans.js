import express from "express";
import Plans from "../model/Plans.js";

const plansRouter = express.Router();

plansRouter.post("/getPlans", async (_req, res) => {
  let plans = await Plans.find();

  if (plans != null) {
    res.status(201).send(plans);
  } else {
    res.status(400).send("Problem getting plans");
  }
});

export default plansRouter;