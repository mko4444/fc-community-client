import { getCast } from "lib/farcaster";
import { useState, useEffect } from "react";
import useSWR from "swr";

export function useThread(hash: string) {
  const [threadHash, setThreadHash] = useState<string | null>(null);

  useEffect(() => {
    hash && getCast(hash).then((cast) => setThreadHash(cast?.threadHash ?? null));
  }, [hash]);

  return useSWR(threadHash && `/api/casts/thread/${threadHash}`);
}
