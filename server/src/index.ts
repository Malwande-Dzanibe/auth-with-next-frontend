import express from "express";
import userRoute from "../src/routes/userRoute";
import authRoute from "../src/routes/authRoute";
import tweetRoute from "../src/routes/tweetRoute";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PROJECT_URL || 5000;

app.use("/user", userRoute);
app.use("/authenticate", authRoute);
app.use("/tweet", tweetRoute);

app.get("/", (req, res) => {
  res.status(200).json("hello world");
});

app.listen(port, () => console.log(`server listening at localhost:${port}`));
