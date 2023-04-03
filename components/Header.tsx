import { shortenAddress } from "helpers";

import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import { useRouter } from "next/router";

export function Header() {
  const { pathname } = useRouter();
  const contract = process.env.CONTRACT_ADDRESS ?? "0xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60";

  return (
    <div className="header">
      <div className="col-c">
        <span className="row-fs-c" style={{ gap: 20, padding: "4px 14px" }}>
          <Image
            height={28}
            width={28}
            src="https://pbs.twimg.com/profile_images/1589390309192089600/6gkgnkDW_400x400.jpg"
            alt="NFTD"
            style={{ borderRadius: 100 }}
          />
          <div className="col" style={{ gap: 4 }}>
            <span className="header__title">NFTD</span>
            <Link
              className="header__address"
              href="https://etherscan.io/address/0xaD08067C7d3D3DbC14A9df8D671FF2565fC5A1aE"
            >
              {shortenAddress(contract)}
            </Link>
          </div>
        </span>
      </div>
      <div className="col" style={{ gap: 6, paddingLeft: 48 }}>
        <Link href="/">
          <button className={cn({ styled: pathname === "/" })}>Home</button>
        </Link>
        <Link href="/members">
          <button className={cn({ styled: pathname === "/members" })}>Members</button>
        </Link>
        <Link href="/members">
          <button className={cn({ styled: pathname === "/events" })}>Meetups</button>
        </Link>
        {/* <Link href="/members">
          <button className={cn({ styled: pathname === "/proposals" })}>Proposals</button>
        </Link>
        <Link href="/members">
          <button className={cn({ styled: pathname === "/launches" })}>Launches</button>
        </Link> */}
      </div>
    </div>
  );
}
