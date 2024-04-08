import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { FaHome } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { useAuthContext } from "../contexts/AuthContext";
import CreateCommunityButton from "./modals/community/CreateCommunityButton";
import JoinedCommunities from "./community/JoinedCommunities";
import DiscoverCommunities from "./community/DiscoverCommunities";
import AllCommunities from "./community/AllCommunities";

function Navbar() {
  const user = useAuthContext().user;

  return (
    <div className="bg-dark-850 text-white overflow-hidden h-full">
      <Link to="/home">
        <SidebarItem icon={<FaHome size={30} />} text="Home" />
      </Link>
      <Link to="/explore">
        <SidebarItem icon={<MdOutlineExplore size={30} />} text="Explore" />
      </Link>
      <Link to="/all">
        <SidebarItem icon={<FaGlobe size={30} />} text="All" />
      </Link>
      {user && (
        <>
          <CustomLine />
          <p className="flex justify-center">
            <CreateCommunityButton />
          </p>
        </>
      )}
      {!user && (
        <>
          <CustomLine />
          <AllCommunities />
        </>
      )}
      {user && (
        <>
          <CustomLine />
          <JoinedCommunities user={user.user_id} />
        </>
      )}
      {user && (
        <>
          <CustomLine />
          <DiscoverCommunities user={user.user_id} />
        </>
      )}
      <p className="text-white opacity-75 text-sm py-4 text-center">
        <span className="hover:text-cyan-300 cursor-pointer">
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

function CustomLine() {
  return (
    <div className="py-2 px-4 opacity-0">
      <hr className="border-line" />
    </div>
  );
}
