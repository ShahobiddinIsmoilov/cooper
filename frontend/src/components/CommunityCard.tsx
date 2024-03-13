import { Box } from "@mui/material";
import { CommunityProps } from "./CommunityList";
import { Link } from "react-router-dom";

interface CommunityCardProps {
  community: CommunityProps;
}

function CommunityCard({ community }: CommunityCardProps) {
  // const baseURL = import.meta.env.VITE_API_BASE_URL;

  return (
    <Link reloadDocument to={`/community/${community.name}`}>
      <Box className="flex gap-3 items-center px-8 py-4 rounded-xl hover:bg-gray-800">
        <Box className="flex items-center min-w-12">
          <img className="rounded-full bg-white h-12 w-12" />
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
