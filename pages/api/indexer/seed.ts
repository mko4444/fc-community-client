import { NextApiRequest, NextApiResponse } from "next";

export default async function seed(_: NextApiRequest, res: NextApiResponse) {
  console.log("Starting to index users.");
  await fetch("http://localhost:3000/api/indexer/users");
  console.log("Finished indexing users.");
  console.log("Starting to index casts.");
  await fetch("http://localhost:3000/api/indexer/casts");
  console.log("Finished indexing casts.");
  return res.status(200).json({ status: "finished" });
}
