import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

import { useAuthContext } from "../contexts/AuthContext";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export async function makeRequest(url: string, options?: { params: {} }) {
  const response = await api(url, options).catch(function (error) {
    return Promise.reject(error);
  });

  api.interceptors.request.use(function (config) {
    if (options?.params) config.params = options.params;
    return config;
  });

  return response;
}

export async function makeRequestWithCredentials(
  url: string,
  options?: { method: string; data: {} }
) {
  const { authTokens, setAuthTokens, setUser, logoutUser } = useAuthContext();

  if (authTokens) {
    const response = await api(url, options).catch(function (error) {
      return Promise.reject(error);
    });

    api.interceptors.request.use(async function (config: any) {
      config.headers.Authorization = `Bearer ${authTokens.access}`;
      if (options?.method) config.method = options.method;
      if (options?.data) config.data = options.data;

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
