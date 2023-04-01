import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { useMembers } from "hooks";
import { FarcasterUser } from "@prisma/client";
import { shortenAddress } from "helpers";
import { Header } from "components";

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
      <Header />
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
