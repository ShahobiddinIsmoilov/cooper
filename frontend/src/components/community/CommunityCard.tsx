import { Box } from "@mui/material";
import { CommunityProps } from "./CommunityList";
import { Link } from "react-router-dom";

interface CommunityCardProps {
  community: CommunityProps;
}

function CommunityCard({ community }: CommunityCardProps) {
  return (
    <Link reloadDocument to={`/community/${community.name}`}>
      <Box className="flex gap-3 items-center px-8 py-4 rounded-xl hover:bg-dark-700">
        <Box className="flex items-center min-w-12">
          <img
            src={`../../../../src/assets/${community.name}.jpg`}
            className="rounded-full h-12 w-12 object-cover"
          />
        </Box>
        <Box className="truncate">
          <p className="text-xl truncate hover:underline">{community.name}</p>
          <p className="text-gray-400 truncate">
            {community.members.toLocaleString()} members
          </p>
        </Box>
      </Box>
    </Link>
  );
}

export default CommunityCard;
