import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router();

const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const content = req.body.content;

  const tweet = await prisma.post.create({
    data: {
      content,
      userId: "5ba1fab9-45fb-468c-a282-20723aba6ae8",
    },
    include: {
      user: true,
    },
  });

  res.status(200).json(tweet);
});

export default router;
