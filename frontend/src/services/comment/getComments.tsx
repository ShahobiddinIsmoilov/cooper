import { makeRequest, makeRequestWithCredentials } from "../makeRequest";

interface GetCommentsOptions {
  withCredentials: boolean;
}

export function getComments(url: string, withCredentials?: GetCommentsOptions) {
  return withCredentials ? makeRequestWithCredentials(url) : makeRequest(url);
}
