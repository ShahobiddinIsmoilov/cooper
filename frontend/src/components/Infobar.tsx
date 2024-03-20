import { Box } from "@mui/material";
import { CommunityProps } from "./community/CommunityList";

interface InfobarProps {
  community?: CommunityProps;
}

function Infobar({ community }: InfobarProps) {
  return (
    <Box
      className="flex-col w-0 sm:w-80 h-full
                bg-dark-800 text-white overflow-hidden"
    >
      <p className="text-white opacity-75 text-lg py-8 text-center">
        ABOUT THIS COMMUNITY
      </p>
    </Box>
  );
}

export default Infobar;
