import { Header, Member, MemberProps } from "components";
import { useMembers } from "hooks";

export default function MembersPage(): JSX.Element {
  const { data = [{}, {}, {}, {}, {}] } = useMembers();

  return (
    <div className="container">
      <Header />
      <h1>Members</h1>
      <div style={{ height: 12 }} />
      <div className="members__list">
        {data.map((m: MemberProps, i: number) => (
          <Member {...m} key={i} />
        ))}
      </div>
    </div>
  );
}
