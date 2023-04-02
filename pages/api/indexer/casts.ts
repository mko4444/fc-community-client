import { getUserCasts, MerkleCast } from "lib/farcaster";
import prisma from "lib/prisma";

export default async function casts(_: any, res: any) {
  // get all users
  // we also want to get the date of their most recent cast, so we can stop the indexer there
  const users = await prisma.farcasterUser.findMany({
    select: {
      fid: true,
      casts: {
        select: {
          timestamp: true,
        },
        orderBy: {
          timestamp: "desc",
        },
        take: 1,
      },
    },
  });
  let castsArr: MerkleCast[] = [];
  // iterate over every user and get recent casts
  for await (const { fid, casts = [] } of users) {
    const mostRecentTimestamp = casts[0]?.timestamp ?? 0;
    const recentCasts = await getUserCasts(fid, mostRecentTimestamp);
    const recentCastsByMember = recentCasts.filter(({ author }) => author.fid === fid);
    castsArr = castsArr.concat(recentCastsByMember ?? []);
  }

  console.log(`Found ${castsArr.length} casts`);

  // console log the earliest cast
  console.log(`Earliest cast:`, castsArr?.sort((a, b) => a.timestamp - b.timestamp)[0]);

  const saved = await Promise.all(
    castsArr.map(
      ({ hash, threadHash, parentHash, author, text, timestamp, replies, reactions, recasts, watches }: MerkleCast) =>
        prisma.cast.upsert({
          where: { hash },
          create: {
            hash,
            threadHash,
            parentHash,
            authorFid: author.fid,
            text,
            timestamp,
            replies: replies.count,
            reactions: reactions.count,
            recasts: recasts.count,
            watches: watches.count,
          },
          update: {
            hash,
            threadHash,
            parentHash,
            authorFid: author.fid,
            text,
            timestamp,
            replies: replies.count,
            reactions: reactions.count,
            recasts: recasts.count,
            watches: watches.count,
          },
        })
    )
  );

  return res.status(200).json({
    success: true,
    length: saved.length,
  });
}
