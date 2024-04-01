import { makeRequest } from "../makeRequest";

interface Props {
  page: number | "home" | "explore";
}

export default function getPosts({ page }: Props) {
  if (page === "home") return makeRequest(`/api/post/list/home`);
  else if (page === "explore") return makeRequest(`/api/post/list/all`);
  else return makeRequest(`/api/post/list/community/${page}`);
}
