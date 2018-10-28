import api from "../consts/api";

export const errorMessage = JSON.stringify({
  error: "No parameter supplied"
});

/**
 * Gets Orgs Repos from API
 */
export const getRepos = async org => {
  if (!org) {
    return await errorMessage;
  }

  const response = await fetch(api.host + api.endpoints.repos(org), {
    headers: {
      "Content-Type": "application/json"
    },
    method: "GET"
  });
  return await response.json();
};

/**
 * Gets Issues for specific Repo
 */
export const getIssues = async (org, repo) => {
  if (!repo || !org) {
    return await errorMessage;
  }

  const response = await fetch(api.host + api.endpoints.openIssues(org, repo), {
    headers: {
      "Content-Type": "application/json"
    },
    method: "GET"
  });
  return await response.json();
};
