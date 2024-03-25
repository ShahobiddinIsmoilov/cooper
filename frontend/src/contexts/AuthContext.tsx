import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContextProps } from "../interfaces/authContextProps";
import { makeRequest } from "../services/makeRequest";
import { useDialog } from "./DialogContext";
import LoginForm from "../forms/LoginForm";
import { LoginFormProps } from "../interfaces/loginFormProps";

const AuthContext = createContext<AuthContextProps | null>(null);

export function useAuthContext() {
  return useContext(AuthContext) as AuthContextProps;
}

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens")!)
      : null
  );

  const [user, setUser] = useState(
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens")!)
      : null
  );

  const [loading, setLoading] = useState(true);

  const { setDialogContent } = useDialog();
  async function register(values: LoginFormProps) {
    // e.preventDefault();
    // const element = e.target;

    const userData = {
      username: values.username,
      password: values.password,
    };

    try {
      await makeRequest("/api/user/register/", {
        method: "post",
        data: userData,
      });
      setDialogContent(<LoginForm />);
    } catch {
      console.log("Shit's gone downhill in register function bruh");
    }
  }

  async function login(values: LoginFormProps) {
    // e.preventDefault();
    // const element = e.target;

    const userData = {
      username: values.username,
      password: values.password,
    };

    try {
      const response = await makeRequest("/api/user/token/", {
        method: "post",
        data: userData,
      });
      setAuthTokens(response.data);
      setUser(jwtDecode(response.data.access));
      localStorage.setItem("authTokens", JSON.stringify(response.data));
    } catch {
      console.log("Login function is having a stroke");
    }
  }

  function logout() {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  }

  const contextData = {
    user: user,
    authTokens: authTokens,
    registerUser: register,
    loginUser: login,
    logoutUser: logout,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
