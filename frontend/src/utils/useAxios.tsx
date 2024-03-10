import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import { AuthContext, AuthContextProps } from "../context/AuthContext";

const baseURL = "http://127.0.0.1:8000";

const useAxios = () => {
  const { authTokens, setAuthTokens, setUser, logoutUser } = useContext(
    AuthContext
  ) as AuthContextProps;

  const axiosInstance: any = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${authTokens?.access}`,
    },
  });

  axiosInstance.interceptors.request.use(async (req: any) => {
    const user = jwtDecode(authTokens.access);
    const isExpired = dayjs.unix(user.exp!).diff(dayjs()) < 1;

    if (!isExpired) return req;

    try {
      const response = await axios.post(`${baseURL}/user/token/refresh/`, {
        refresh: authTokens.refresh,
      });

      if (response.status === 200) {
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        req.headers.Authorization = `Bearer ${response.data.access}`;

        setAuthTokens(response.data);
        setUser(jwtDecode(response.data.access));

        return req;
      }
    } catch (err: any) {
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
