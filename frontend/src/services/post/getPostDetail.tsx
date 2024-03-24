import { makeRequest } from "../makeRequest";

function getPostDetail(post_id: number) {
  return makeRequest(`/api/post/${post_id}`);
}

export default getPostDetail;
