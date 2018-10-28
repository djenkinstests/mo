export default {
  host: "https://api.github.com/",

  endpoints: {
    repos: org => `orgs/${org}/repos`,
    openIssues: (org, repo) => `repos/${org}/${repo}/issues?state=open`
  }
};
