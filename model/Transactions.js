import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Transactions", transactionSchema);
