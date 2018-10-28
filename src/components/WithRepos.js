import React from "react";
import Repo from "./Repo";

const WithRepos = ({ repos, org }) => {
  if (!org || !repos) return null;
  return repos.map(repo => <Repo repo={repo} key={repo.id} org={org} />);
};

export default WithRepos;
