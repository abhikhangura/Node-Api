import mongoose from "mongoose";

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);

  console.log(
    `MongoDB connected !!! and the host is : ${conn.connection.host}`.cyan.italic
  );
};

export default connectDB;
