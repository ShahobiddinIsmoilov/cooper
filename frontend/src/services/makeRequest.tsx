import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import { AuthContext, AuthContextProps } from "../contexts/AuthContext";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export async function makeRequest(url: string) {
  const response = await api(url).catch(function (error) {
    return Promise.reject(error);
  });
  return response;
}

export async function makeRequestWithCredentials(url: string, data?: {}) {
  const { authTokens, setAuthTokens, setUser, logoutUser } = useContext(
    AuthContext
  ) as AuthContextProps;

  if (authTokens) {
    const response = await api.get(url).catch(function (error) {
      return Promise.reject(error);
    });

    api.interceptors.request.use(async (config: any) => {
      config.headers.Authorization = `Bearer ${authTokens.access}`;
      if (data) config.data = data;

      const user = jwtDecode(authTokens.access);
      const isExpired = dayjs.unix(user.exp!).diff(dayjs()) < 1;

      if (!isExpired) return config;

      try {
        const response = await axios.post(
          `${config.baseURL}/api/user/token/refresh/`,
          {
            refresh: authTokens.refresh,
          }
        );

        localStorage.setItem("authTokens", JSON.stringify(response.data));

        config.headers.Authorization = `Bearer ${response.data.access}`;

        setAuthTokens(response.data);
        setUser(jwtDecode(response.data.access));

        return config;
      } catch (err: any) {
        if (err.response.status === 401) {
          logoutUser();
        }
      }
    });
    return response;
  } else return Promise.reject();
}
