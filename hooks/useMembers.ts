import useSWR from "swr";

export function useMembers() {
  return useSWR("/api/members");
}
