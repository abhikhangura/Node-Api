import express from "express";
import Transaction from "../model/Transactions.js";

const transactionsRouter = express.Router();

//Create a new transaction
transactionsRouter.post("/newTranaction", async (req, res) => {
  const { email, amount, cardNumber } = req.body;
  let date = new Date();
  try {
    const transactionDoc = new Transaction({
      email: email,
      amount: amount,
      date: date,
      cardNumber: cardNumber,
    });

    await transactionDoc.save().catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        msg: `Database error ${err}`,
      });
    });

    res.status(201).json({
      success: true,
      msg: "Tranaction succesfull!!",
      transaction: transactionDoc,
    });
  } catch (error) {
    console.log(error);
  }
});

//Fetch the tranaction

transactionsRouter.post("/getTransactions", async (req, res) => {
  const cardNumber = req.body.cardNumber;

  const transactions_exist = await Transaction.findOne({cardNumber :cardNumber});

  if (transactions_exist) {
    res.status(201).send(transactions_exist);
  }
});

export default transactionsRouter;
