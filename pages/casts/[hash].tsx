import { Cast, Header, CastProps } from "components";
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
    <div className="page">
      <div style={{ width: "100%" }} className="col-fs-fe">
        <Header />
      </div>
      <div className="page__inner">
        <div className="row-fs-c">
          <button onClick={back}>←</button>
          <h1>Thread</h1>
        </div>
        <div style={{ height: 28 }} />
        {parents.map((c: CastProps, i: number) => (
          <Cast hasRail {...c} key={i} />
        ))}
        <Cast disableLinking {...cast} />
        {children.map((c: CastProps, i: number) => (
          <Cast hasTopBorder indent={1} {...c} key={i} />
        ))}
      </div>
    </div>
  );
}
