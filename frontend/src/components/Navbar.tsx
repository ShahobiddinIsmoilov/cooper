import { Link, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { FaHome } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { useAuthContext } from "../contexts/AuthContext";
import CreateCommunityButton from "./modals/community/CreateCommunityButton";
import JoinedCommunities from "./community/JoinedCommunities";
import DiscoverCommunities from "./community/DiscoverCommunities";
import AllCommunities from "./community/AllCommunities";
import Credits from "./Credits";

function Navbar() {
  const user = useAuthContext().user;

  return (
    <div
      className={`bg-dark-850 text-white h-full overflow-x-hidden overflow-hidden hover:overflow-y-scroll navbar-scrollbar flex flex-col justify-between`}
    >
      <div>
        <div className="mt-2">
          <SidebarItem icon={<FaHome size={24} />} text="Home" />
          <SidebarItem icon={<MdOutlineExplore size={24} />} text="Explore" />
          <SidebarItem icon={<FaGlobe size={24} />} text="All" />
        </div>
        <div>
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
          {/* <p className="text-white opacity-75 text-sm py-4 text-center">
          <span className="hover:text-cyan-300 cursor-pointer">
            ALL COMMUNITIES
          </span>
        </p> */}
        </div>
      </div>
      <Credits />
    </div>
  );
}

export default Navbar;

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
}

function SidebarItem({ text, icon }: SidebarItemProps) {
  const path = useLocation().pathname;
  const current = "/" + text.toLowerCase();

  return (
    <Link
      to={current}
      className={`mx-4 flex items-center px-8 py-3 rounded-xl hover:bg-dark-750 ${
        current === path && "bg-dark-750"
      }`}
    >
      {icon}
      <p className="text-lg truncate mx-2">{text}</p>
    </Link>
  );
}

function CustomLine() {
  return (
    <div className="py-2 px-4 opacity-0">
      <hr className="border-line" />
    </div>
  );
}
