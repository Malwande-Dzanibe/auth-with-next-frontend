import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import Jwt from "jsonwebtoken";

const router = Router();

const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const content = req.body.content;

  const auth = req.headers["authorization"];

  const jwtoken = auth?.split(" ")[1];

  // try {
  //@ts-ignore
  const payLoad = Jwt.verify(jwtoken, "secret");

  console.log(payLoad.id);

  const tweet = await prisma.post.create({
    data: {
      content,
      userId: "a10feba2-9fe9-44c4-8c10-0f7d8efbc5d7",
    },
    include: {
      user: true,
    },
  });

  res.status(200).json(tweet);
  // } catch (error) {
  // res.status(401).json({
  //   message: error,
  // });
  // }
});

export default router;
