import express from "express";
import userRoute from "../src/routes/userRoute";
import authRoute from "../src/routes/authRoute";
import tweetRoute from "../src/routes/tweetRoute";
import cors from "cors";
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

console.log(process.env.PROJECT_URL);
console.log(process.env.DATABASE_URL);
console.log(process.env.JWT_SECRET);

app.use("/user", userRoute);
app.use("/authenticate", authRoute);
app.use("/tweet", tweetRoute);

app.get("/", (req, res) => {
  res.status(200).json({ message: `welcome to ${port}` });
});

app.listen(port, () => console.log(`server listening at localhost:${port}`));

export default app;
