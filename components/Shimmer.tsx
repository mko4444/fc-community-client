export function Shimmer({
  width = "auto",
  height = "auto",
  flex = false,
  borderRadius = 4,
  margin = 0,
  isLoading = true,
  children,
}: ShimmerProps): JSX.Element {
  return isLoading ? (
    <div className="shimmer-loader" style={{ flex: flex ? 1 : "none", width, height, borderRadius, margin }} />
  ) : (
    <>{children}</>
  );
}

export type ShimmerProps = {
  width?: string | number;
  height?: string | number;
  flex?: boolean;
  borderRadius?: number;
  margin?: string | number;
  isLoading: boolean;
  children: JSX.Element | JSX.Element[];
};
