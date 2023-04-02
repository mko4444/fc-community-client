import { NextApiRequest, NextApiResponse } from "next";
import { translateCastType } from "helpers";
import { getThread } from "lib/farcaster";

export default async function thread(req: NextApiRequest, res: NextApiResponse) {
  const threadHash = req?.query?.threadHash ?? null;

  if (!threadHash || typeof threadHash !== "string") {
    return res.status(400).json({ error: "Invalid thread hash" });
  }

  return res.json(await getThread(threadHash).then((r) => r.map(translateCastType)));
}
