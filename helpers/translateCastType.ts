import type { MerkleCast } from "lib/farcaster";
import type { CastProps } from "components";

/**
 * We use a slightly different format for the cast type than the one in the Merkle API.
 * This function translates a MerkleCast to a Cast.
 * @param {MerkleCast} cast
 * @returns {CastProps} cast
 */
export function translateCastType(cast: MerkleCast): CastProps {
  return {
    hash: cast.hash,
    threadHash: cast.threadHash,
    parentHash: cast.parentHash,
    author: {
      fid: cast.author.fid,
      displayName: cast.author.displayName,
      username: cast.author.username,
      pfpUrl: cast.author.pfp?.url ?? "/default.png",
      bioText: cast.author.profile?.bio.text ?? null,
      locationText: cast.author.profile?.location?.description ?? null,
      locationPlaceId: cast.author.profile?.location?.placeId ?? null,
      followerCount: cast.author.followerCount ?? 0,
      followingCount: cast.author.followingCount ?? 0,
      referrerUsername: cast.author.referrerUsername ?? null,
      connectedAddress: null,
    },
    authorFid: cast.author.fid,
    text: cast.text,
    timestamp: cast.timestamp,
    replies: cast.replies.count,
    reactions: cast.reactions.count,
    recasts: cast.recasts.count,
    watches: cast.watches.count,
  };
}
