import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  currentPlan: {
    type: String,
  },
  expDate: {
    type: String,
  },
  startDate: {
    type: String,
  },
});

export default mongoose.model("card", cardSchema);
