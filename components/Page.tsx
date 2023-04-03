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
      <div className={cn(["page__inner", className])}>
        <div
          className="row-fs-c"
          style={{
            padding: "12px 0",
            gap: 4,
          }}
        >
          {buttonRow}
        </div>
        {children}
      </div>
    </div>
  );
}
