import api from "../consts/api";

//TODO **** ---- zero error handling ----- ******

/**
 * Gets Orgs Repos from API
 */
export const getRepos = async org => {
  const response = await fetch(api.host + api.endpoints.repos(org), {
    headers: {
      "Content-Type": "application/json"
    },
    method: "GET"
  });
  return await response.json();
};
