import { Stack } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext, AuthContextProps } from "../contexts/AuthContext";

interface NavbarProps {
  direction?: "row" | "column";
}

function Navbar({ direction = "row" }: NavbarProps) {
  return (
    <div>
      <Stack
        direction={direction}
        className="flex justify-between bg-secondary
                text-white px-10 py-5"
      >
        <Link to="/" className="no-underline">
          <p className="text-base xs:text-2xl">Shredded</p>
        </Link>
        <Access />
      </Stack>
    </div>
  );
}

function Access() {
  const { user } = useContext(AuthContext) as AuthContextProps;

  return user ? (
    <>
      <p className="text-base xs:text-2xl text-orange-400">{user.username}</p>
      <Link to="/logout">
        <p className="text-base xs:text-2xl">Logout</p>
      </Link>
    </>
  ) : (
    <Link to="/login">
      <p className="text-base sm:text-2xl">Login</p>
    </Link>
  );
}

export default Navbar;
