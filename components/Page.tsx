import { Header } from "components";

export function Page({
  className,
  children,
  buttonRow,
}: {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
  buttonRow?: React.ReactNode | React.ReactNode[];
}) {
  return (
    <div className="page">
      <div style={{ width: "100%" }} className="col-fs-fe">
        <Header />
      </div>
      <div>
        <div className={className}>
          {buttonRow ? <div className="page__navbar row-fs-c">{buttonRow}</div> : <div style={{ height: 20 }} />}
          {children}
        </div>
      </div>
    </div>
  );
}
