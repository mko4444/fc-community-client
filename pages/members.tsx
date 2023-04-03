import { Member, MemberProps, Page } from "components";
import { useMembers } from "hooks";

export default function MembersPage(): JSX.Element {
  const { data = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}] } = useMembers();

  return (
    <Page
      buttonRow={
        <>
          <button className="styled">Trending</button>
          <button>Recent</button>
        </>
      }
    >
      <div className="divider" style={{ margin: "8px 0" }} />
      <div style={{ height: 12 }} />
      <div className="members__list">
        {data.map((m: MemberProps, i: number) => (
          <Member {...m} key={i} />
        ))}
      </div>
    </Page>
  );
}
