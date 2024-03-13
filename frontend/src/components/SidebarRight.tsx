import { Box } from "@mui/material";
import { CommunityProps } from "./CommunityList";

interface SidebarRightProps {
  community?: CommunityProps;
}

function SidebarRight({ community }: SidebarRightProps) {
  return (
    <Box
      className="flex-col w-0 sm:w-80 rounded-xl sticky top-20
                bg-gray-900 text-white shadow overflow-hidden"
    >
      <p className="text-white opacity-75 text-xl py-8 text-center">
        ABOUT THIS COMMUNITY
      </p>
      <p className="text-white opacity-75 text-xl py-8"></p>
    </Box>
  );
}

export default SidebarRight;
