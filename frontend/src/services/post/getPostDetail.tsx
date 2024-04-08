import { makeRequest } from "../makeRequest";

function getPostDetail(post_id: number) {
  return makeRequest(`/api/post/detail/${post_id}`);
}

export default getPostDetail;
