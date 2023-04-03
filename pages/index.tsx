import { Cast, CastProps, Page } from "components";
import { useCasts } from "hooks";

export default function HomePage(): JSX.Element {
  const { data = [{}, {}, {}, {}, {}] } = useCasts();

  return (
    <Page
      className="casts__list"
      buttonRow={
        <div className="row-sb-c" style={{ flex: 1 }}>
          <div className="row-fs-c" style={{ gap: 6 }}>
            <button className="styled">Relevant</button>
            <button>Following</button>
            <button>Favorited</button>
          </div>
          <button className="styled blue">Cast</button>
        </div>
      }
    >
      {data.map((c: CastProps, i: number) => (
        <Cast hasTopBorder {...c} key={i} />
      ))}
    </Page>
  );
}
