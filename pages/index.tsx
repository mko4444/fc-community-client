import { Cast, CastProps, Page } from "components";
import { useCasts } from "hooks";

export default function HomePage(): JSX.Element {
  const { data = [{}, {}, {}, {}, {}] } = useCasts();

  return (
    <Page
      className="casts__list"
      buttonRow={
        <>
          <button className="styled">Relevant</button>
          <button>Following</button>
          <button>Favorited</button>
        </>
      }
    >
      {data.map((c: CastProps, i: number) => (
        <Cast hasTopBorder {...c} key={i} />
      ))}
    </Page>
  );
}
