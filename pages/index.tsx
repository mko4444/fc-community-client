import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { useCasts } from "hooks";
import { Cast, FarcasterUser } from "@prisma/client";
import { getRelativeTime, shortenAddress } from "helpers";

const Home: NextPage = () => {
  const { data = [] } = useCasts();
  console.log(data);
  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: 640,
      }}
    >
      <div className="row-fs-c" style={{ padding: "28px 0", gap: 8 }}>
        <div className="col-c">
          <h4 style={{ margin: 0 }}>Test Client: Purple DAO</h4>
          <span style={{ opacity: 0.66 }}>{`Contract address: ${shortenAddress(
            "0xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60"
          )}`}</span>
        </div>
        <div />
        <Link href="/">
          <button>Casts</button>
        </Link>
        <Link href="/members">
          <button>Members</button>
        </Link>
      </div>
      <h1>Casts</h1>
      <div className="casts__list">
        {data.map(({ text, author, hash, timestamp }: Cast & { author: FarcasterUser }, index: number) => (
          <>
            <div className="casts__list__divider" key={`${hash}-${index}-divider`} />
            <div key={`${hash}-${index}`} className="casts__list__row">
              <Image
                src={author?.pfpUrl ?? "/default.png"}
                height={28}
                width={28}
                alt={author?.username}
                className="members__list__avatar"
              />
              <div>
                <div className="row" style={{ gap: 4 }}>
                  <span className="casts__list__displayName">{author.displayName}</span>
                  <span className="casts__list__username">@{author.username}</span>
                  <span className="casts__list__username">• {getRelativeTime(timestamp)}</span>
                </div>
                <p>{text}</p>
              </div>
            </div>
          </>
        ))}
      </div>
      {/* <div className="members__list">
        {data.map(({ pfpUrl, fid, username, displayName }: FarcasterUser) => (
          <div className="members__list__row" key={fid}>
            <Image
              width={28}
              height={28}
              src={pfpUrl ?? "/avatar.png"}
              className="members__list__avatar"
              alt={username}
            />
            <div />
            <span className="members__list__displayName">{displayName}</span>
            <span className="members__list__username">@{username}</span>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Home;
