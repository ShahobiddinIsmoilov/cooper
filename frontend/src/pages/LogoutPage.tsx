import { useContext, useEffect } from "react";
import { AuthContext, AuthContextProps } from "../contexts/AuthContext";
import { Typography } from "@mui/material";

function LogoutPage() {
  const { logoutUser, redirect } = useContext(AuthContext) as AuthContextProps;

  useEffect(() => {
    logoutUser();

    function timedRedirect() {
      redirect("/");
    }

    setTimeout(timedRedirect, 3000);
  });

  return (
    <Typography>
      You have successfully logged out. You will be redirected to the homepage
      in a moment...
    </Typography>
  );
}

export default LogoutPage;
