import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { useState } from "react";
import { FaRedditAlien } from "react-icons/fa6";
import Navbar from "./Navbar";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

export default function NavbarDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="lg:hidden">
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        duration={200}
      >
        <div className="flex items-center gap-8 w-[280px] h-[50px] bg-dark-850">
          <button onClick={toggleDrawer} className="ml-4">
            <MdMenu size={28} />
          </button>
          <Link to="/home">
            <FaRedditAlien size={32} />
          </Link>
        </div>
        <Navbar />
      </Drawer>
    </div>
  );
}
