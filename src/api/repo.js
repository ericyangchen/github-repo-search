import axios from "axios"

const BASE_URL = "https://api.github.com";

export const getUser = (username) => {
  return axios.get(`${BASE_URL}/users/${username}`);
}
export const getRepoList = (username, page, sortBy) => {
  // determine sortby
  let sort = null;
  switch (sortBy) {
    case "full_name":
      sort = "full_name";
      break;
    case "last-updated":
      sort = "updated";
      break;
    default:
      sort = "full_name";
      break;
  }
  return axios.get(`${BASE_URL}/users/${username}/repos?per_page=10&page=${page}&sort=${sort}`);
}
export const getRepoDetail = (username, repo) => {
  return axios.get(`${BASE_URL}/repos/${username}/${repo}`);
}
