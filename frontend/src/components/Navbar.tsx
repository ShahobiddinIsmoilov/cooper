import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext, AuthContextProps } from "../contexts/AuthContext";
import profilePicture from "../assets/user.png";
import { useDialogue } from "../contexts/DialogueContext";
import RegisterForm from "../forms/RegisterForm";

function Navbar() {
  return (
    <div
      className="flex justify-between bg-dark-900
                  text-white px-4 xs:px-8 py-4 items-center"
    >
      <Link to="/" className="no-underline">
        <p className="text-base xs:text-2xl">Shredded</p>
      </Link>
      <Access />
    </div>
  );
}

function Access() {
  const { user } = useContext(AuthContext) as AuthContextProps;
  const { setIsDialogueVisible, setDialogueContent } = useDialogue();

  return user ? (
    <>
      {setIsDialogueVisible(false)}
      <p className="text-base xs:text-2xl text-orange-400">{user.username}</p>
      <Link to="/logout">
        <img
          src={profilePicture}
          className="h-12 w-12 min-w-12 rounded-full object-cover"
        />
      </Link>
    </>
  ) : (
    <button
      onClick={() => {
        setDialogueContent(<RegisterForm />);
        setIsDialogueVisible(true);
      }}
      className="rounded-full py-2 px-4 cursor-pointer bg-cyan-700 hover:bg-cyan-600"
    >
      Sign up
    </button>
  );
}

export default Navbar;
