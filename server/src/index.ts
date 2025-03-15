import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "../src/routes/financial-records";
import cors from "cors";
import dotenv from "dotenv";
const app: Express = express();
const port = process.env.PORT || 3000;
dotenv.config();
app.use(express.json());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Enable URL-encoded data


const mongoURI = process.env.MongoURI;
if (!mongoURI) {
  console.error("❌ MongoURI is not defined. Check your .env file.");
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/financial-records", financialRecordRouter);

app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});