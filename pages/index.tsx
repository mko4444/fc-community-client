import { Header, Cast, CastProps } from "components";
import { useCasts } from "hooks";

export default function HomePage(): JSX.Element {
  const { data = [{}, {}, {}, {}, {}] } = useCasts();

  return (
    <div className="container">
      <Header />
      <h1>Casts</h1>
      <div style={{ height: 12 }} />
      <div className="casts__list">
        {data.map((c: CastProps, i: number) => (
          <Cast hasTopBorder {...c} key={i} />
        ))}
      </div>
    </div>
  );
}
