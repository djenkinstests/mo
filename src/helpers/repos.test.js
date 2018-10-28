import { getRepos, errorMessage } from "./repos";

const repoResponse = [
  {
    id: 186749,
    node_id: "MDEwOlJlcG9zaXRvcnkxODY3NDk=",
    name: "http-parser",
    full_name: "nodejs/http-parser"
  }
];

describe("getRepos", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("expects an organisation to be passed", () => {
    return getRepos().then(res => {
      expect(res).toEqual(errorMessage);
    });
  });

  it("calls github and returns nodejs repos to me", async () => {
    fetch.mockResponseOnce(JSON.stringify(repoResponse));
    const res = await getRepos("nodejs");
    expect(res).toEqual(repoResponse);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      "https://api.github.com/orgs/nodejs/repos"
    );
  });
});
