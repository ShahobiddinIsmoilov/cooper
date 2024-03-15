import { Box } from "@mui/material";
import { CommunityProps } from "./community/CommunityList";

interface SidebarRightProps {
  community?: CommunityProps;
}

function Infobar({ community }: SidebarRightProps) {
  return (
    <Box
      className="flex-col w-0 sm:w-80 h-full sticky
                bg-neutral-900 text-white overflow-hidden"
    >
      <p className="text-white opacity-75 text-lg py-8 text-center">
        ABOUT THIS COMMUNITY
      </p>
      <p className="text-white opacity-75 text-lg py-8 text-center">
        ABOUT THIS COMMUNITY
      </p>
      <p className="text-white opacity-75 text-lg py-8 text-center">
        ABOUT THIS COMMUNITY
      </p>
      <p className="text-white opacity-75 text-lg py-8 text-center">
        ABOUT THIS COMMUNITY
      </p>
      <p className="text-white opacity-75 text-xl py-8"></p>
    </Box>
  );
}

export default Infobar;
