import { Cast, CastProps, Page } from "components";
import { useCasts } from "hooks";
import Image from "next/image";

export default function HomePage(): JSX.Element {
  const { data = [{}, {}, {}, {}, {}] } = useCasts();

  return (
    <Page className="casts__list">
      <div className="col" style={{ flex: 1, gap: 20 }}>
        <Image
          alt=""
          height={48}
          width={48}
          src="https://openseauserdata.com/files/aa9c90abba9c5400076654477f2c08c9.svg"
          style={{ borderRadius: 100 }}
        />
        <h2>user</h2>
        {/* <div className="row-fs-c" style={{ gap: 6 }}>
            <button className="styled">Relevant</button>
            <button>Following</button>
            <button>Favorited</button>
          </div> */}
      </div>
      <div style={{ height: 20 }} />
      {data.map((c: CastProps, i: number) => (
        <Cast hasTopBorder={!!i} {...c} key={i} />
      ))}
    </Page>
  );
}
