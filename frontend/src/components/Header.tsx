import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext, AuthContextProps } from "../contexts/AuthContext";

function Header() {
  let { user, logoutUser } = useContext(AuthContext) as AuthContextProps;
  return (
    <div>
      <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
        Home
      </Link>
      <span> | </span>
      {user ? (
        <span onClick={logoutUser} style={{ color: "blue", cursor: "pointer" }}>
          Logout
        </span>
      ) : (
        <Link to="/login" style={{ textDecoration: "none", color: "blue" }}>
          Login
        </Link>
      )}
      <span> | </span>
      <span style={{ color: "red", cursor: "pointer" }}>{user?.username}</span>
    </div>
  );
}

export default Header;
