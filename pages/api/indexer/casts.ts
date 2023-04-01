import { getUserCasts, MerkleCast } from "lib/farcaster";
import prisma from "lib/prisma";

const fetcher = async (url: string, options: any) => {
  const res = await fetch(url, options);
  const result = await res.json();
  return result;
};

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
  // update casts

  // get all users
  // const allUsers =
  //   (await getAllUsers({
  //     includeVerifications: true,
  //   })) ?? [];
  // // get the nft owners
  // const owners = await getOwners({ address });
  // const ownerAddresses = owners.map((owner: any) => owner.owner_address.toLowerCase());
  // // filter users
  // console.log(`ownerAddresses:`, ownerAddresses);
  // console.log(`Sample connectedAddress:`, allUsers[0]?.connectedAddress);
  // const filteredUsers = allUsers.filter(({ connectedAddress }: any) =>
  //   ownerAddresses.includes(connectedAddress.toLowerCase())
  // );
  // console.log(`allUsers sample:`, allUsers[0]);
  // console.log(`owners sample:`, owners[0]);
  // console.log(`Found ${filteredUsers.length} users with ${address}`);
  // // update users

  // return res.status(200).json({ success: true, length: saved.length });
}

const buildOwnersEndpoint = ({ cursor, address }: { cursor: string | null; address: string }) =>
  `https://api.simplehash.com/api/v0/nfts/owners/ethereum/${address}?limit=1000000${cursor ? `&cursor=${cursor}` : ""}`;

async function getOwners({ address }: { address: string }) {
  let users: any = [];
  let cursor: string | null = "";

  while (typeof cursor === "string") {
    try {
      await fetcher(buildOwnersEndpoint({ cursor, address }), {
        headers: { accept: "application/json", "X-Api-Key": process.env.SIMPLEHASH_KEY },
        method: "GET",
      }).then(({ next_cursor, owners }) => {
        console.log(next_cursor, owners?.length);
        users = [...users, ...(owners ?? [])];
        cursor = next_cursor ?? null;
      });
      continue;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  return users;
}
