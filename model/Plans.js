import mongoose from "mongoose";

const plansSchema = mongoose.Schema({
  planName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Plans", plansSchema);
