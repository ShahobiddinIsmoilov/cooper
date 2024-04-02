import { makeRequest } from "../makeRequest";

interface Props {
  page: number | "home" | "explore";
  sortOption: string;
}

export default function getPosts({ page, sortOption }: Props) {
  if (page === "home")
    return makeRequest(`/api/post/list/home/?sort=${sortOption}`);
  else if (page === "explore")
    return makeRequest(`/api/post/list/all/?sort=${sortOption}`);
  else
    return makeRequest(`/api/post/list/community/${page}/?sort=${sortOption}`);
}
