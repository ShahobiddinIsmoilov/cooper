import { makeRequest } from "./makeRequest";

function getUserDetail(user_id: number) {
  return makeRequest(`/api/user/users/${user_id}`);
}

export default getUserDetail;
