import React, { Component } from "react";
import { fetchStates } from "../consts/fetch";
import { Error, Loading } from "./FetchStates";
import { getRepos } from "../helpers/repos";

class App extends Component {
  state = {
    fetchStatus: fetchStates.idle
  };

  async getRepos() {
    this.setState({
      fetchStatus: fetchStates.loading
    });

    const response = await getRepos();

    if (response.length > 0) {
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
  }

  componentDidMount() {
    this.getRepos();
  }

  render() {
    const { fetchStatus } = this.state;

    //TODO - extract to reusable components & don't define in render
    const HasRepos = () => <div />;
    const HasNoRepos = () => <h1>Got No Repos!</h1>;

    //TODO - extract to <WithData/> component in future
    const HandleFetchStatus = {
      [fetchStates.completeWithoutData]: <HasNoRepos />,
      [fetchStates.completeWithData]: <HasRepos />,
      [fetchStates.error]: <Error />,
      [fetchStates.loading]: <Loading />,
      [fetchStates.idle]: null
    };

    return (
      <section className="repos">{HandleFetchStatus[fetchStatus]}</section>
    );
  }
}

export default App;
