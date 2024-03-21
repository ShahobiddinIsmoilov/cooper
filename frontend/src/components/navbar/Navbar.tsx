import { Link } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";
import { useDialog } from "../../contexts/DialogContext";
import { useEffect } from "react";
import LoginForm from "../../forms/LoginForm";
import ProfileNavbar from "./ProfileNavbar";

function Navbar() {
  return (
    <div
      className="flex justify-between bg-dark-900 h-[72px]
                  text-white px-4 xs:px-8 py-2 items-center"
    >
      <Link to="/" className="no-underline">
        <p className="text-base xs:text-2xl">Shredded</p>
      </Link>
      <Access />
    </div>
  );
}

function Access() {
  const authContext = useAuthContext();
  const user = authContext ? authContext.user : null;
  const { setIsDialogVisible, setDialogContent } = useDialog();

  useEffect(() => {
    user && setIsDialogVisible(false);
  }, [user, setIsDialogVisible]);

  return user ? (
    <>
      <ProfileNavbar />
    </>
  ) : (
    <button
      onClick={() => {
        setDialogContent(<LoginForm />);
        setIsDialogVisible(true);
      }}
      className="text-lg rounded-full py-2 px-4 cursor-pointer bg-cyan-700 hover:bg-cyan-600"
    >
      Sign in
    </button>
  );
}

export default Navbar;
