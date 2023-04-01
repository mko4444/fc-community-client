import Link from "next/link";
import { shortenAddress } from "helpers";

export function Header() {
  return (
    <div className="col" style={{ padding: "28px 0", gap: 8 }}>
      <div className="col-c">
        <h4 style={{ margin: 0 }}>Test Client: Purple DAO</h4>
        <span style={{ opacity: 0.66 }}>{`Contract address: ${shortenAddress(
          "0xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60"
        )}`}</span>
      </div>
      <div />
      <div className="row" style={{ gap: 8 }}>
        <Link href="/">
          <button>Casts</button>
        </Link>
        <Link href="/members">
          <button>Members</button>
        </Link>
        <Link href="/members">
          <button>Events</button>
        </Link>
        <Link href="/members">
          <button>Proposals</button>
        </Link>
        <Link href="/members">
          <button>Launches</button>
        </Link>
      </div>
    </div>
  );
}
