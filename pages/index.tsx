import { Cast, CastProps, Page, Composer } from "components";
import { useCasts } from "hooks";
import { useState } from "react";
import cn from "classnames";

export default function HomePage(): JSX.Element {
  const [tab, setTab] = useState<Tab>("relevant");
  const { data = [{}, {}, {}, {}, {}] } = useCasts();

  return (
    <Page
      className="casts__list"
      buttonRow={
        <div className="col" style={{ flex: 1, gap: 20 }}>
          <div className="row-fs-c" style={{ gap: 6 }}>
            {(["relevant", "following", "bookmarks"] as Tab[]).map((text: Tab) => (
              <button
                style={{ textTransform: "capitalize" }}
                onClick={() => setTab(text)}
                key={text}
                className={cn({ styled: text === tab })}
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      }
    >
      <Composer />
      <div style={{ height: 6 }} />
      <div className="divider" />
      <div style={{ height: 12 }} />
      {data.map((c: CastProps, i: number) => (
        <Cast {...c} key={i} />
      ))}
    </Page>
  );
}

type Tab = "relevant" | "following" | "favorited";
