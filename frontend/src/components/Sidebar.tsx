import { Box } from "@mui/material";
import CommunityList from "./community/CommunityList";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <Box
      className="flex-col w-0 lg:w-80 rounded-xl sticky top-20
                bg-dark-900 text-white shadow overflow-hidden"
    >
      <Box className="h-4"></Box>
      <Link to="/">
        <SidebarItem text="Home" />
      </Link>
      <Link to="/">
        <SidebarItem text="All" />
      </Link>
      <p className="text-white opacity-75 text-lg pt-8 pb-2 text-center">
        POPULAR COMMUNITIES
      </p>
      <CommunityList />
      <p className="text-white opacity-75 text-sm py-4 text-center">
        <span className="hover:text-cyan-300 cursor-pointer ">
          ALL COMMUNITIES
        </span>
      </p>
    </Box>
  );
}

export default Sidebar;

interface SidebarItemProps {
  text: string;
}

function SidebarItem({ text }: SidebarItemProps) {
  return (
    <Box className="flex gap-3 items-center px-8 py-4 rounded-xl hover:bg-dark-700">
      <Box className="flex items-center min-w-12">
        <img className="rounded-full bg-white h-12 w-12" />
      </Box>
      <Box className="truncate">
        <p className="text-xl truncate">{text}</p>
      </Box>
    </Box>
  );
}
