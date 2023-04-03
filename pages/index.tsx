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
      <div style={{ height: 8 }} />
      <Composer />
      <div style={{ height: 20 }} />
      {data.map((c: CastProps, i: number) => (
        <Cast hasTopBorder={!!i} {...c} key={i} />
      ))}
    </Page>
  );
}

type Tab = "relevant" | "following" | "favorited";
