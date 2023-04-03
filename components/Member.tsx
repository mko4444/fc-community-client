import { FarcasterUser } from "@prisma/client";
import { Shimmer } from "components";

import Image from "next/image";
import Link from "next/link";

export function Member(props: MemberProps) {
  return (
    <Link className="member" href={`/u/${props.username}`}>
      <Shimmer isLoading={!props?.pfpUrl} height={28} width={28} borderRadius={100}>
        <Image
          width={28}
          height={28}
          src={props.pfpUrl ?? "/avatar.png"}
          className="member__avatar"
          alt={props.username}
        />
      </Shimmer>
      <div />
      <Shimmer isLoading={!props?.displayName} width={200} height={20}>
        <span className="member__displayName">{props.displayName}</span>
        <span className="member__username">
          @{props.username} • fid #{props.fid}
        </span>
      </Shimmer>
    </Link>
  );
}

export interface MemberProps extends FarcasterUser {}
