import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useDialog } from "../../contexts/DialogContext";
import LoginForm from "../../forms/LoginForm";
import ProfileNavbar from "./ProfileNavbar";

function Header() {
  return (
    <div
      className="flex justify-between bg-dark-900 h-[72px]
                  text-white px-4 xs:px-8 py-2 items-center"
    >
      <Link to="/" className="no-underline">
        <p className="text-base xs:text-2xl">Shredded</p>
      </Link>
      <Authenticated />
    </div>
  );
}

// THERE IS AN ANNOYING BUG WHERE SAVING FROM LOGINFORM, REGISTERFORM AND
// LOGOUTFORM CAUSE THIS FUCKER TO HAVE A NULL USER WHEN USING AUTHCONTEXT.
// THAT IS WHY THIS LITTLE SHIT HAS ITS OWN IMPLEMENTATION OF INITIALIZING
// THE USER FROM THE LOCALSTORAGE. THIS CAN'T BE A SOLUTION TO THAT BUG!!!
function Authenticated() {
  const { user } = useAuthContext();
  const { setIsDialogVisible, setDialogContent } = useDialog();

  return user ? (
    <ProfileNavbar />
  ) : (
    <button
      onClick={() => {
        setDialogContent(<LoginForm />);
        setIsDialogVisible(true);
      }}
      className="text-lg rounded-full py-2 px-4 cursor-pointer bg-cyan-700 hover:bg-cyan-600"
    >
      Log in
    </button>
  );
}

export default Header;
