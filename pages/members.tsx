import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { useMembers } from "hooks";
import { FarcasterUser } from "@prisma/client";
import { shortenAddress } from "helpers";

const Home: NextPage = () => {
  const { data = [] } = useMembers();

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
      <h1>Members</h1>
      <div className="members__list">
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
            <span className="members__list__username">
              @{username} • fid #{fid}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
