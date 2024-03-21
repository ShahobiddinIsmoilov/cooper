import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import { makeRequest } from "../services/makeRequest";
import { useDialog } from "./DialogContext";
import LoginForm from "../forms/LoginForm";

interface UserProps {
  user_id: number;
  username: string;
}

export interface AuthContextProps {
  user: UserProps | null;
  setUser: (e: any) => void;
  registerUser: (e: any) => void;
  loginUser: (e: any) => void;
  logoutUser: () => void;
  setAuthTokens: (e: any) => void;
  authTokens: {
    access: string;
    refresh: string;
  };
  redirect: (e: string) => void;
}

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
  const navigate = useNavigate();

  async function registerUser(e: any) {
    e.preventDefault();
    const element = e.target;

    const userData = {
      username: element.username.value,
      password: element.password.value,
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

  async function loginUser(e: any) {
    e.preventDefault();
    const element = e.target;

    const userData = {
      username: element.username.value,
      password: element.password.value,
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

  function logoutUser() {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  }

  function redirect(path: string) {
    navigate(path);
  }

  let contextData = {
    user: user,
    authTokens: authTokens,
    registerUser: registerUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    redirect: redirect,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens?.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
