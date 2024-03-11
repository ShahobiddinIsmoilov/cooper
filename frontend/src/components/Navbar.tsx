import { Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext, AuthContextProps } from "../contexts/AuthContext";

interface NavbarProps {
  direction?: "row" | "column";
}

function Navbar({ direction = "row" }: NavbarProps) {
  return (
    <Stack
      direction={direction}
      alignItems="center"
      p="30px"
      sx={{
        color: "white",
        background: "#1a325e",
        justifyContent: "space-between",
      }}
    >
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        <Typography variant="h5">Shredded</Typography>
      </Link>
      <Access />
    </Stack>
  );
}

function Access() {
  const { user } = useContext(AuthContext) as AuthContextProps;

  return user ? (
    <>
      <Typography variant="h5" color="orange">
        {user.username}
      </Typography>
      <Link to="/logout">
        <Typography variant="h5">Logout</Typography>
      </Link>
    </>
  ) : (
    <Link to="/login">
      <Typography variant="h5">Login</Typography>
    </Link>
  );
}

export default Navbar;
