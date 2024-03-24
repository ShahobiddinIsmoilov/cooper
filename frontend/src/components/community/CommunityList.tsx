import { Stack } from "@mantine/core";
import CommunityCard from "./CommunityCard";
import { CommunityProps } from "../../interfaces/communityProps";
import { useQuery } from "@tanstack/react-query";
import getCommunities from "../../services/community/getCommunities";

function CommunityList() {
  const { isPending, error, data } = useQuery({
    queryKey: ["community-list"],
    queryFn: () => getCommunities(),
  });

  if (isPending) return "Loeading...";

  if (error) return "Couldn't load data";

  const communities = data.data;

  return (
    <Stack>
      {communities.map((community: CommunityProps) => (
        <CommunityCard key={community.name} community={community} />
      ))}
    </Stack>
  );
}

export default CommunityList;
