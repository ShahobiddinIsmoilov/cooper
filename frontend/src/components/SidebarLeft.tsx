import { Box } from "@mui/material";
import CommunityList from "./CommunityList";

function SidebarLeft() {
  return (
    <Box
      className="flex-col w-0 lg:w-80 rounded-xl sticky top-20
                bg-gray-900 text-white shadow overflow-hidden"
    >
      <p className="text-white opacity-75 text-xl py-8 text-center">
        🔥 TOP COMMUNITIES
      </p>
      <CommunityList />
      <p className="text-white opacity-75 text-sm py-8 text-center">
        <span className="hover:text-cyan-400 cursor-pointer ">SHOW MORE</span>
      </p>
    </Box>
  );
}

export default SidebarLeft;
