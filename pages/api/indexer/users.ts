import { getAllUsers } from "lib/farcaster";
import prisma from "lib/prisma";

const fetcher = async (url: string, options: any) => {
  const res = await fetch(url, options);
  const result = await res.json();
  return result;
};

export default async function users({ query: { address } }: any, res: any) {
  // get the most recent user's FID so we don't have to re-index everything
  const mostRecentUser = await prisma.farcasterUser.findFirst({
    orderBy: { fid: "desc" },
    select: { fid: true },
  });
  const fidToStopAt = mostRecentUser?.fid ?? 0;

  // get all users
  const allUsers = (await getAllUsers({ includeVerifications: true, fidToStopAt })) ?? [];
  // get the nft owners
  const owners = await getOwners({ address });
  const ownerAddresses = owners.map((owner: any) => owner.owner_address.toLowerCase());
  // filter users
  console.log(`ownerAddresses:`, ownerAddresses);
  console.log(`Sample connectedAddress:`, allUsers[0]?.connectedAddress);

  const filteredUsers = allUsers.filter(({ connectedAddress }: any) =>
    ownerAddresses.includes(connectedAddress.toLowerCase())
  );

  console.log(`allUsers sample:`, allUsers[0]);
  console.log(`owners sample:`, owners[0]);

  console.log(`Found ${filteredUsers.length} users with ${address}`);

  // update users
  const saved = await Promise.all(
    filteredUsers.map((user: any) =>
      prisma.farcasterUser.upsert({
        where: { fid: user.fid },
        create: {
          fid: user.fid,
          username: user.username,
          displayName: user.displayName,
          connectedAddress: user.connectedAddress,
          bioText: user.profile.bio.text,
          pfpUrl: user.pfp.url,
          locationText: user.profile.location.description,
          locationPlaceId: user.profile.location.placeId,
          followerCount: user.profile.followerCount,
          followingCount: user.profile.followingCount,
          referrerUsername: user.referrerUsername,
        },
        update: {
          fid: user.fid,
          username: user.username,
          displayName: user.displayName,
          connectedAddress: user.connectedAddress,
          bioText: user.profile.bio.text,
          pfpUrl: user.pfp.url,
          locationText: user.profile.location.description,
          locationPlaceId: user.profile.location.placeId,
          followerCount: user.profile.followerCount,
          followingCount: user.profile.followingCount,
          referrerUsername: user.referrerUsername,
        },
      })
    )
  );
  return res.status(200).json({ success: true, length: saved.length });
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
