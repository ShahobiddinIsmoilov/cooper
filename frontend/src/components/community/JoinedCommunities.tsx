import { Stack } from "@mantine/core";
import CommunityCard from "./CommunityCard";
import { CommunityProps } from "../../interfaces/communityProps";
import { useQuery } from "@tanstack/react-query";
import getCommunities from "../../services/community/getCommunities";

export default function JoinedCommunities({ user }: { user: number }) {
  const { isPending, error, data } = useQuery({
    queryKey: ["community-list-joined"],
    queryFn: () => getCommunities(`/api/community/list/joined/?user=${user}`),
  });

  if (isPending) return null;

  if (error) return null;

  const communities = data.data;

  return (
    communities.length > 0 && (
      <Stack gap={0}>
        <p className="opacity-75 py-2 text-center">COMMUNITIES YOU JOINED</p>
        {communities.map((community: CommunityProps) => (
          <CommunityCard key={community.name} community={community} />
        ))}
      </Stack>
    )
  );
}
