import express from "express";
import userRoute from "../src/routes/userRoute";
import authRoute from "../src/routes/authRoute";
import tweetRoute from "../src/routes/tweetRoute";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// PROJECT_URL would come from an .env file in a real project
const PROJECT_URL = "https://auth-with-next-frontend.vercel.app";
const port = PROJECT_URL || 5000;

app.use("/user", userRoute);
app.use("/authenticate", authRoute);
app.use("/tweet", tweetRoute);

app.listen(port, () => console.log(`server listening at localhost:${port}`));
