import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getCasts(_: NextApiRequest, res: NextApiResponse) {
  const casts = await prisma.cast.findMany({
    where: {
      parentHash: null,
    },
    include: {
      author: true,
    },
    orderBy: {
      timestamp: "desc",
    },
    take: 100,
  });

  return res.status(200).json(casts);
}
