import React, { Component } from "react";
import { fetchStates } from "../consts/fetch";
import { Error, Loading } from "./FetchStates";
import WithRepos from "./WithRepos";
import { getRepos } from "../helpers/repos";

class App extends Component {
  state = {
    fetchStatus: fetchStates.idle,
    org: "nodejs"
  };

  async getRepos() {
    this.setState({
      fetchStatus: fetchStates.loading
    });

    try {
      const response = await getRepos(this.state.org);
      if (response && response.length > 0) {
        this.setState({
          repos: response,
          fetchStatus: fetchStates.completeWithData
        });
      } else {
        this.setState({
          repos: null,
          fetchStatus: fetchStates.completeWithoutData
        });
      }
    } catch (e) {
      this.setState({
        repos: null,
        fetchStatus: fetchStates.error
      });
    }
  }

  componentDidMount() {
    this.getRepos();
  }

  render() {
    const { fetchStatus, org, repos } = this.state;
    const WithNoRepos = () => <h1>Got No Repos!</h1>;

    //TODO - extract to <WithData/> component in future
    const HandleFetchStatus = {
      [fetchStates.completeWithoutData]: <WithNoRepos />,
      [fetchStates.completeWithData]: <WithRepos org={org} repos={repos} />,
      [fetchStates.error]: <Error />,
      [fetchStates.loading]: <Loading />,
      [fetchStates.idle]: null
    };

    return <ul>{HandleFetchStatus[fetchStatus]}</ul>;
  }
}

export default App;
