// AuthContext provides the authentication data to its child nodes.
// User log in and logout logic is also handled here

import { ReactNode, createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

// properties of user object
interface UserProps {
  user_id: number;
  username: string;
}

// properties of the context that will be passed to children
export interface AuthContextProps {
  user: UserProps | null;
  setUser: (e: any) => void;
  loginUser: (e: any) => void;
  logoutUser: () => void;
  setAuthTokens: (e: any) => void;
  authTokens: {
    access: string;
    refresh: string;
  };
}

// create the context
export const AuthContext = createContext<AuthContextProps | null>(null);

// properties of context provider
interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  // Stores the access and refresh tokens. Initializes with locally
  // saved tokens if they exist, otherwise initializes with null
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens")!)
      : null
  );

  // Stores the user object. Initializes with decoded access token
  // if it exists locally, otherwise initializes with null
  const [user, setUser] = useState(
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens")!)
      : null
  );

  // loading is true until server responds and components render
  const [loading, setLoading] = useState(true);

  // initialize useNavigate hook to navigate user to different page
  const navigate = useNavigate();

  // login logic
  async function loginUser(e: any) {
    e.preventDefault();

    const element = e.target;

    // options to send with the request to get tokens
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: element.username.value,
        password: element.password.value,
      }),
    };

    const baseURL = import.meta.env.VITE_API_BASE_URL;

    // send request to get new tokens and parse them to json
    const response = await fetch(`${baseURL}/api/user/token/`, options);
    const data = await response.json();

    // if everything is ok
    if (response.status === 200) {
      // set the value of authTokens to newly received tokens
      setAuthTokens(data);

      // set the value of user to decoded new access token
      setUser(jwtDecode(data.access));

      // save tokens locally
      localStorage.setItem("authTokens", JSON.stringify(data));

      // navigate to homepage once logged in
      navigate("/");
    } else {
      alert("Something went wrong");
    }
  }

  // logout logic: set states to null, clear local tokens, navigate
  function logoutUser() {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  }

  // context data to pass to children
  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
  };

  // if the value of authTokens or loading state changes
  // (e.g. due to page refresh or token refresh), useEffect
  // sets the user state value to new access token
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
