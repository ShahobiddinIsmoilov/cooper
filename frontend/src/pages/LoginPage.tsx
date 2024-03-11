import { useContext } from "react";
import { AuthContext, AuthContextProps } from "../contexts/AuthContext";

function LoginPage() {
  const { loginUser } = useContext(AuthContext) as AuthContextProps;
  return (
    <>
      <br />
      <form onSubmit={loginUser}>
        <input type="text" name="username" placeholder="Enter Username" />
        <input type="password" name="password" placeholder="Enter Password" />
        <input type="submit" />
      </form>
      <br />
      You are not logged in
    </>
  );
}

export default LoginPage;
