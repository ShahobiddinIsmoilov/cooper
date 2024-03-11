// Custom hook with an axios interceptor. Locally checks the expiration date
// every time before making a private request. If the access token is valid,
// axios sends it with every request. Otherwise, token refreshes.

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import { AuthContext, AuthContextProps } from "../contexts/AuthContext";

// API baseURL
const baseURL = import.meta.env.VITE_API_BASE_URL;

const useAxios = () => {
  // importing needed context values
  const { authTokens, setAuthTokens, setUser, logoutUser } = useContext(
    AuthContext
  ) as AuthContextProps;

  // custom axios instance
  const axiosInstance: any = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${authTokens?.access}`,
    },
  });

  // intercepting the request
  axiosInstance.interceptors.request.use(async (req: any) => {
    // decode access token and check the expiry
    const user = jwtDecode(authTokens.access);
    const isExpired = dayjs.unix(user.exp!).diff(dayjs()) < 1;

    // carry on with the request if valid
    if (!isExpired) return req;

    // otherwise, refresh the tokens
    try {
      // request to refresh the tokens
      const response = await axios.post(`${baseURL}/api/user/token/refresh/`, {
        refresh: authTokens.refresh,
      });

      // save the new tokens
      localStorage.setItem("authTokens", JSON.stringify(response.data));

      // attach the new access token to the request
      req.headers.Authorization = `Bearer ${response.data.access}`;

      // update authTokens and user states with the new tokens
      setAuthTokens(response.data);
      setUser(jwtDecode(response.data.access));

      // carry on with the request
      return req;
    } catch (err: any) {
      // if refresh token is expired, logout the user
      if (err.response.status === 401) {
        logoutUser();
      } else {
        alert("Something went wrong. Please try again later");
      }
    }
  });

  return axiosInstance;
};

export default useAxios;
