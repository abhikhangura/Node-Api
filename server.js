import express from "express";
import colors from "colors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/mongodbConnection.js";
import userRouter from "./routes/user.js";
import transactionsRouter from "./routes/transactions.js";

const http = express();
const PORT_NUMBER = process.env.port || 3000;

http.use(morgan("dev"));

http.use(express.json({}));
http.use(
  express.json({
    extended: true,
  })
);

http.use(bodyParser.urlencoded({ extended: true }));
// Config file path
dotenv.config({
  path: "./config/config.env",
});

// Database Connection
connectDB();

http.get("/", (req, res) => {
  res.send("Welcome to api");
});
// User registeration
http.use(userRouter);

// Create new tranaction
http.use("/", transactionsRouter);

// Sever running on a specific port
var server = http.listen(PORT_NUMBER, (req, res) => {
  console.log(`Server is running at port: ${server.address().port}`.green.bold);
});
