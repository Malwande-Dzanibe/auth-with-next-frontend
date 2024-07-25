import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import Jwt from "jsonwebtoken";

const router = Router();

const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const content: string = req.body.content;

  const auth = req.headers["authorization"];

  const jwtoken = auth?.split(" ")[1];

  // try {
  if (!jwtoken) {
    return res.sendStatus(401);
  }

  //  cantseethis would come from an .env file in a real project
  const payLoad = Jwt.verify(jwtoken, "cantseethis") as {
    id: string;
  };

  const apiToken = await prisma.token.findUnique({
    where: {
      id: payLoad.id,
    },
    include: {
      user: true,
    },
  });

  if (!apiToken?.isValid || apiToken.expiration < new Date()) {
    return res.status(401).json({ message: "API token expired" });
  }

  const tweet = await prisma.post.create({
    data: {
      content,
      userId: apiToken?.user.id,
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
