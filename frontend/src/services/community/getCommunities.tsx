import { makeRequest } from "../makeRequest";

function getCommunities(params?: string) {
  return makeRequest(`/api/community/list/`);
}

export default getCommunities;
