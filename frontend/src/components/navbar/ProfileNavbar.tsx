import { ReactNode, useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { BiSolidLike } from "react-icons/bi";

import profilePicture from "../../assets/gordon.jpg";
import { useDialog } from "../../contexts/DialogContext";
import LogoutForm from "../../forms/LogoutForm";
import { useAuthContext } from "../../contexts/AuthContext";

function ProfileNavbar() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { setIsDialogVisible, setDialogContent } = useDialog();

  useEffect(() => {
    function handleClickOutside(e: any) {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setShowMenu(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div ref={menuRef}>
      <img
        onClick={() => {
          setShowMenu(!showMenu);
        }}
        src={profilePicture}
        className="h-14 w-14 min-w-14 rounded-full object-cover border-4 border-white
                    border-opacity-0 hover:border-opacity-50 cursor-pointer"
      />
      {showMenu && (
        <div
          className="absolute flex flex-col bg-dark-700 top-[66px] right-[30px]
                    rounded-xl w-72 py-2 shadow"
        >
          <ProfileInfoNavbar />
          <MenuItem icon={<FaUserCircle size={30} />} text="View Profile" />
          <MenuItem icon={<IoMdSettings size={30} />} text="Settings" />
          <div
            onClick={() => {
              setDialogContent(<LogoutForm />);
              setIsDialogVisible(true);
              setShowMenu(false);
            }}
            className="hover:text-red-400"
          >
            <MenuItem icon={<MdLogout size={30} />} text="Log out" />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileNavbar;

interface MenuItemProps {
  icon: ReactNode;
  text: string;
}

function MenuItem({ icon, text }: MenuItemProps) {
  return (
    <div
      className="flex gap-2 text-lg hover:bg-dark-600 p-4 cursor-pointer
                  items-center rounded-lg"
    >
      {icon}
      {text}
    </div>
  );
}

function ProfileInfoNavbar() {
  const { user } = useAuthContext();

  return (
    <div className="gap-2 px-4 py-2 flex items-center">
      <img src={profilePicture} className="rounded-lg w-14 h-14 min-w-14" />
      <div className="overflow-hidden">
        <p className="text-orange-400 text-lg truncate">{user?.username}</p>
        <p className="flex items-center gap-1">
          <BiSolidLike className="text-yellow-400" />
          <span className="opacity-75">{(2458).toLocaleString()} likes</span>
        </p>
      </div>
    </div>
  );
}
