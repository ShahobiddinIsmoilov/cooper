import { makeRequestWithCredentials } from "../makeRequest";

function createPost(data: {}) {
  return makeRequestWithCredentials("/api/post/create", "post", data);
}

export default createPost;
