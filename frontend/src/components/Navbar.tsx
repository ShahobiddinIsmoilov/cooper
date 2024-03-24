import CommunityList from "./community/CommunityList";
import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { FaHome } from "react-icons/fa";

function Navbar() {
  return (
    <div className="flex-col rounded-xl w-80 min-w-80 text-white overflow-hidden">
      <Link to="/">
        <SidebarItem icon={<FaHome size={30} />} text="Home" />
      </Link>
      <p className="text-white opacity-75 pt-8 pb-2 text-center">
        POPULAR COMMUNITIES
      </p>
      <CommunityList />
      <p className="text-white opacity-75 text-sm py-4 text-center">
        <span className="hover:text-cyan-300 cursor-pointer ">
          ALL COMMUNITIES
        </span>
      </p>
    </div>
  );
}

export default Navbar;

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
}

function SidebarItem({ text, icon }: SidebarItemProps) {
  return (
    <div className="mx-4 flex items-center px-8 py-4 rounded-xl hover:bg-dark-700">
      {icon}
      <p className="text-xl truncate mx-2">{text}</p>
    </div>
  );
}
