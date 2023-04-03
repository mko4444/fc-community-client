import { Header } from "components";
import cn from "classnames";

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
        <div className={cn(["page__inner", className])}>
          <div className="page__navbar row-fs-c">{buttonRow}</div>
          <div className="divider" style={{ margin: "8px 0" }} />
          {children}
        </div>
      </div>
    </div>
  );
}
