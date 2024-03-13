import { Box } from "@mui/material";
import { CommunityProps } from "./CommunityList";

interface SidebarRightProps {
  community?: CommunityProps;
}

function Infobar({ community }: SidebarRightProps) {
  return (
    <Box
      className="flex-col w-0 sm:w-80 rounded-xl
                bg-secondary text-white shadow overflow-hidden"
    >
      <p className="text-white opacity-75 text-lg py-8 text-center">
        ABOUT THIS COMMUNITY
      </p>
      <p className="text-white opacity-75 text-xl py-8"></p>
    </Box>
  );
}

export default Infobar;
