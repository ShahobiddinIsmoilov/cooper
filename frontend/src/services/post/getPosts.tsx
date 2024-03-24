import { makeRequest } from "../makeRequest";

function getPosts() {
  return makeRequest(`/api/post/list/all`);
}

export default getPosts;
