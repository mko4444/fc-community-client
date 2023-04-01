import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getMembers(_: NextApiRequest, res: NextApiResponse) {
  const members = await prisma.farcasterUser.findMany({
    orderBy: {
      fid: "desc",
    },
  });

  return res.status(200).json(members);
}
