import express from "express";
import dotenv from "dotenv";
import { users } from "./users.mjs";
import cors from "cors";

const app = express();
dotenv.config();

const port = process.env.port;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(cors());

app.get("/users", (req, res) => {
  res.status(200).json(users);
});
