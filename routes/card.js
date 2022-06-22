import e from "express";
import express from "express";
import Card from "../model/Card.js";

const cardRouter = express.Router();

cardRouter.post("/cardDetails", async (req, res) => {
  const email = req.body.email;

  const card_exist = await Card.findOne({ email: email });

  if (card_exist) {
    res.status(201).send(card_exist);
  } else {
    res.status(400).json({
      success: false,
      msg: "Card doesn't exist!!",
    });
  }
});

cardRouter.post("/createCard", async (req, res) => {
  const { cardNumber, email, currentplan, expDate, startDate } = req.body;

  try {
    const cardDoc = new Card({
        cardNumber: cardNumber,
        email:email,
        startDate:startDate,
        expDate:expDate,
        currentplan:currentplan
    });

    await cardDoc.save().catch((err) => {
        console.log(err);
        res.status(500).json({
          success: false,
          msg: `Database error ${err}`,
        });
      });

      res.status(201).json({
        success: true,
        msg: "Card registered successfully!!",
      });
  } catch (error) {
    console.log(error);
  }
});

export default cardRouter;