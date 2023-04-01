import useSWR from "swr";

export function useCasts() {
  return useSWR("/api/casts");
}
