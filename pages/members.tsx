import { Member, MemberProps, Page } from "components";
import { useMembers } from "hooks";

export default function MembersPage(): JSX.Element {
  const { data = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}] } = useMembers();

  return (
    <Page
      buttonRow={
        <div className="row-fs-c" style={{ width: "100%", gap: 6 }}>
          <button className="styled">Trending</button>
          <button>Recent</button>
        </div>
      }
    >
      <div className="members__list">
        {data.map((m: MemberProps, i: number) => (
          <Member {...m} key={i} />
        ))}
      </div>
    </Page>
  );
}
