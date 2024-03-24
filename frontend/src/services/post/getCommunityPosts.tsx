import { makeRequest } from "../makeRequest";

function getCommunityPosts(community: string) {
  return makeRequest(`/api/post/list/${community}`);
}

export default getCommunityPosts;
