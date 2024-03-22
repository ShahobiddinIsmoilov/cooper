import { makeRequest } from "../makeRequest";

function getCommunityDetail(community: string) {
  return makeRequest(`/api/community/list/${community}`);
}

export default getCommunityDetail;
