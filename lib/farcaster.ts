const fetcher = (url: string, options?: object) => fetch(url, { headers, ...options }).then((res) => res.json());

// this is so we have a hardcoded way of making sure past events don't get added
// feel free to update in future releases
export const timeToStartAt = 1677874898000;

/**
 * Finds the Farcaster user that corresponds to the connected address
 * @param address - the connected address for the user
 * @returns the user's farcaster data, if it exists
 */
export async function getConnectedUser(address: string) {
  try {
    return await merkleFetcher(buildConnectedAddressEndpoint(address), {
      headers: {
        Authorization: `Bearer ${process.env.MERKLE_SECRET}`,
      },
    }).then(({ result }) => result?.user || null);
  } catch (err) {
    console.error(err);
    return null;
  }
}
/**
 * Finds the Farcaster user that corresponds to the connected address
 * @param address - the connected address for the user
 * @returns the user's farcaster data, if it exists
 */
export async function getAllUsers({
  includeVerifications,
  fidToStopAt,
}: {
  includeVerifications?: boolean;
  fidToStopAt: number;
}) {
  console.log({ fidToStopAt });
  // initialize array of users
  let users: any[] = [];
  // initialize cursor
  let cursor: string | null = "";
  // get the last timestamp
  while (typeof cursor === "string") {
    try {
      await merkleFetcher(buildAllUsersEndpoint(cursor), {
        headers: {
          Authorization: `Bearer ${process.env.MERKLE_SECRET}`,
        },
      }).then(({ result, next }) => {
        const lowestFidInList = result?.users?.sort((a: MerkleAuthor, b: MerkleAuthor) => a.fid - b.fid)?.[0]?.fid ?? 0;
        // we stop here if we have a fidToStopAt and the most recent fid in the list is greater than or equal to it
        const shouldStopHere = fidToStopAt && fidToStopAt >= lowestFidInList;
        // if we should stop here, we set the cursor to null, otherwise we set it to the next cursor
        users = users.concat(result?.users ?? []);
        cursor = shouldStopHere ? null : next?.cursor ?? null;
      });
      continue;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  if (includeVerifications) {
    for await (const user of users) {
      const verifications = await fetcher(`https://api.warpcast.com/v2/verifications?fid=${user.fid}`).then(
        ({ result }) => result?.verifications ?? []
      );
      user.connectedAddress = verifications?.[0]?.address ?? null;
      console.log(`User ${user.fid} has ${verifications.length} verifications`);
    }
  }
  // return the users
  return users?.filter((f) => !!f.connectedAddress);
}
/**
 * Calls the farcaster api to get a cast
 * @param hash - the hash of the cast
 * @returns the cast
 */
export async function getCast(hash: string): Promise<MerkleCast | null> {
  try {
    return await merkleFetcher(buildCastEndpoint(hash)).then(({ result }: MerkleCastResponse) => result.cast);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
/**
 * Calls the farcaster api to get a cast
 * @param hash - the hash of the cast
 * @returns the cast
 */
export async function getUserCasts(fid: number, timestampToStopAt: number = 0): Promise<MerkleCast[]> {
  // initialize array of users
  let casts: any[] = [];
  // initialize cursor
  let cursor: string | null = "";

  while (typeof cursor === "string") {
    try {
      await merkleFetcher(buildUserCastsEndpoint(fid, cursor), {
        headers: {
          Authorization: `Bearer ${process.env.MERKLE_SECRET}`,
        },
      }).then(({ result, next }) => {
        // get the casts after timestampToStopAt
        const recentCasts = casts.filter(({ timestamp }) => timestamp > timestampToStopAt);
        // we stop here if we have a timestampToStopAt and the most recent cast in the list is greater than or equal to it
        const shouldStopHere = recentCasts.length !== casts.length;
        // add the new casts to the array of casts
        casts = casts.concat(result?.casts ?? []);
        // if we should stop here, we set the curso r to null, otherwise we set it to the next cursor
        cursor = shouldStopHere ? null : next?.cursor ?? null;
      });
      continue;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  return casts ?? [];
}
/**
 * Casts a given message to the Farcaster protocol
 * @param text the text of the cast
 * @param hash the hash of the parent cast (if it's a reply)
 * @param fid the fid of the parent cast author (if it's a reply)
 * @returns the posted cast
 */
export async function sendCast(text: string, hash?: string, fid?: number): Promise<MerkleCast | null> {
  try {
    return await merkleFetcher("https://api.warpcast.com/v2/casts", {
      method: "POST",
      body: JSON.stringify({
        text,
        parent:
          hash && fid
            ? {
                hash,
                fid,
              }
            : undefined,
      }),
    }).then(({ result }: any) => result.cast);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
/**
 * Calls the farcaster api to get a thread
 * @param threadHash - the hash of the thread
 * @returns the thread
 */
export async function getThread(threadHash: string): Promise<MerkleCast[]> {
  try {
    return merkleFetcher(buildThreadEndpoint(threadHash)).then(({ result }) => result.casts);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
/**
 * Gets the recent notifications for the user
 * @returns the notifications
 */
export async function getNotifs(): Promise<MerkleNotif[]> {
  // initialize array of notifs
  let notifs: MerkleNotif[] = [];
  // initialize cursor
  let cursor: string | null = "";
  // get the last timestamp

  // loop until the cursor is null
  while (typeof cursor === "string") {
    await merkleFetcher(buildNotifEndpoint(cursor)).then(({ result, next }: MerkleNotifResponse) => {
      // add new notifs to the array
      notifs = notifs.concat(result.notifications.filter((f: any) => f.timestamp > timeToStartAt));
      // set the cursor to the next cursor
      cursor = result.notifications.length > 0 && next?.cursor ? next?.cursor : null;
    });
  }
  // return the notifs
  return notifs.sort((a, b) => a.timestamp - b.timestamp);
}

const merkleFetcher = (url: string, options?: object) => fetcher(url, { headers, ...options });

const buildAllUsersEndpoint = (cursor?: string) =>
  "https://api.warpcast.com/v2/recent-users?limit=1000&cursor=" + cursor;

const buildNotifEndpoint = (cursor?: string) =>
  "https://api.warpcast.com/v2/mention-and-reply-notifications?cursor=" + cursor;

const buildThreadEndpoint = (threadHash: string) =>
  "https://api.warpcast.com/v2/all-casts-in-thread?threadHash=" + threadHash;

const buildCastEndpoint = (hash: string) => "https://api.warpcast.com/v2/cast?hash=" + hash;

const buildUserCastsEndpoint = (fid: number, cursor?: string) =>
  `https://api.warpcast.com/v2/casts?fid=${fid}&limit=100&cursor=${cursor}`;

const buildConnectedAddressEndpoint = (address: string) =>
  "https://api.warpcast.com/v2/user-by-verification?address=" + address;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.MERKLE_SECRET}`,
};

export interface MerkleResponse {
  result: {
    casts?: MerkleCast[];
  };
  next?: {
    cursor: string;
  };
}

export interface MerkleError {
  errors: [
    {
      message?: string;
    }
  ];
}

export interface MerkleNotifResponse {
  result: {
    notifications: MerkleNotif[];
  };
  next?: {
    cursor: string;
  };
}

export interface MerkleCastResponse {
  result: {
    cast: MerkleCast;
  };
}

export interface MerkleCastsResponse {
  result: {
    casts: MerkleCast[];
  };
}

export interface MerkleCast {
  hash: string;
  _hashV2: string;
  threadHash: string;
  _threadHashV2: string;
  parentHash: string;
  author: MerkleAuthor;
  text: string;
  mentions?: MerkleAuthor[];
  timestamp: number;
  attachments?: {
    openGraph?: {
      url: string;
      domain: string;
      useLargeImage: boolean;
      strippedCastText: string;
    }[];
  };
  replies: {
    count: number;
  };
  reactions: {
    count: number;
  };
  recasts: {
    count: number;
    recasters: Array<any>;
  };
  watches: {
    count: number;
  };
}

export interface MerkleAuthor {
  fid: number;
  username: string;
  displayName: string;
  profile?: {
    bio: {
      text: string;
      mentions: Array<string>;
    };
    location?: {
      placeId: string;
      description: string;
    };
  };
  pfp?: {
    url: string;
    verified: boolean;
  };
  followerCount?: number;
  followingCount?: number;
}

export interface MerkleNotif {
  type: "cast-reply" | "cast-mention";
  id: string;
  timestamp: number;
  actor: MerkleAuthor;
  content: {
    cast: MerkleCast;
  };
}
