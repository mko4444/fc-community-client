import { Cast as CastType, FarcasterUser } from "@prisma/client";
import { getRelativeTime } from "helpers";
import { Shimmer } from "components";
import cn from "classnames";

import Image from "next/image";
import Link from "next/link";

import { reaction, reply, recast, watch } from "svg";

export function Cast({ disableLinking, hasRail = false, hasTopBorder = false, indent = 0, ...props }: CastProps) {
  function onReply(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
  }
  function onReact(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
  }
  function onWatch(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
  }
  function onRecast(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
  }

  return (
    <Link
      className={cn(["cast", { disableLinking }])}
      href={`/casts/${props.hash}`}
      onClick={(e) => disableLinking && e.preventDefault()}
      style={{ paddingLeft: `${indent * 40}px` }}
    >
      <div className={cn(["cast__grid", { hasTopBorder }])}>
        <div className="col-fs-c">
          <Shimmer height={36} width={36} isLoading={!props.author?.pfpUrl} borderRadius={100}>
            <Link href={`/users/${props.author?.username}`}>
              <Image
                alt=""
                src={props.author?.pfpUrl ?? "/default.png"}
                height={36}
                width={36}
                className="member__avatar"
              />
            </Link>
          </Shimmer>
          {hasRail && <div className="cast__rail" />}
        </div>
        <div className="col" style={{ flex: 1 }}>
          <Shimmer isLoading={!props.author?.displayName} width="100%" height={16} margin="0 0 8px 0">
            <Link href={`/users/${props.author?.username}`} className="cast__author row" style={{ gap: 4 }}>
              <h4 className="casts__list__displayName">{props.author?.displayName}</h4>
              <span className="casts__list__username">@{props.author?.username}</span>
              <span className="casts__list__username">• {getRelativeTime(props?.timestamp)}</span>
            </Link>
          </Shimmer>
          <Shimmer isLoading={!props.text} width="100%" height={48}>
            <p>{props.text}</p>
          </Shimmer>
          <Shimmer isLoading={!props.text} width="100%" height={16} margin="8px 0 0 0">
            <div className="cast__reactions">
              <button onClick={onReply}>
                {reply} {props?.replies}
              </button>
              <button onClick={onRecast}>
                {recast} {props?.recasts}
              </button>
              <button onClick={onReact}>
                {reaction} {props?.reactions}
              </button>
              <button onClick={onWatch}>
                {watch} {props?.watches}
              </button>
            </div>
          </Shimmer>
        </div>
      </div>
    </Link>
  );
}

export interface CastProps extends CastType {
  author: FarcasterUser;
  disableLinking?: boolean;
  indent?: number;
  hasRail?: boolean;
  hasTopBorder?: boolean;
}
