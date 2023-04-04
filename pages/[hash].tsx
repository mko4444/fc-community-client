import { Cast, CastProps, Page, Composer } from "components";
import { getParentThread } from "helpers";
import { useThread } from "hooks";

import { useRouter } from "next/router";

export default function CastPage() {
  const { query, back } = useRouter();
  const hash = (query?.hash as string) ?? undefined;
  const { data = [{}] } = useThread(hash);
  // get the parent thread
  const convo = data?.length ? getParentThread(data, hash) : [];
  // get the index of the cast
  const index = convo?.findIndex((c) => c?.hash === hash);
  // split the array on the index
  const [
    parents, // properly ordered parents in the thread
    cast, // the cast we're looking at
    children, // the children of the cast
  ] = [convo.slice(0, index), convo[index], convo.slice(index + 1)];

  return (
    <Page
      buttonRow={
        <div className="col" style={{ flex: 1, gap: 20 }}>
          <div className="row-fs-c" style={{ gap: 6 }}>
            <button
              onClick={back}
              style={{
                fontFamily: "Inter",
              }}
            >
              {arrow}
            </button>
            <div style={{}} />
            {/* {(["relevant", "following", "bookmarks"] as Tab[]).map((text: Tab) => (
              <button
                style={{ textTransform: "capitalize" }}
                onClick={() => setTab(text)}
                key={text}
                className={cn({ styled: text === tab })}
              >
                {text}
              </button>
            ))} */}
            <label style={{ fontWeight: 600 }}>Cast</label>
          </div>
        </div>
      }
    >
      {parents.map((c: CastProps, i: number) => (
        <Cast hasRail {...c} key={i} />
      ))}
      <Cast disableLinking {...cast} />
      <div style={{ paddingLeft: 58 }}>
        <div className="divider" />
        <div style={{ height: 12 }} />
        <Composer placeholder="Start typing your reply here..." />
        <div style={{ height: 8 }} />
        <div className="divider" />
        <div style={{ height: 12 }} />
      </div>
      {children.map((c: CastProps, i: number) => (
        <Cast hasTopBorder={!!i} indent={1} {...c} key={i} />
      ))}
    </Page>
  );
}

const arrow = (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
    <path d="M 11.28125 1.28125 L 1.28125 11.28125 L 0.59375 12 L 1.28125 12.71875 L 11.28125 22.71875 L 12.71875 21.28125 L 4.4375 13 L 24 13 L 24 11 L 4.4375 11 L 12.71875 2.71875 Z"></path>
  </svg>
);
