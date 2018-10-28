export default {
  host: "https://api.github.com/",

  endpoints: {
    repos: org => `orgs/${org}/repos`
  }
};
