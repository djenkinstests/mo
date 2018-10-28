import React, { Component } from "react";
import { fetchStates } from "../consts/fetch";
import { Error, Loading } from "./FetchStates";
import WithIssues from "./WithIssues";
import { getIssues } from "../helpers/repos";

class Repo extends Component {
  state = {
    issues: null
  };

  async getIssues() {
    const { repo, org } = this.props;
    const { issues } = this.state;

    if (issues) {
      return;
    }

    this.setState({
      fetchStatus: fetchStates.loading
    });

    try {
      const response = await getIssues(org, repo.name);
      if (response.length > 0) {
        this.setState({
          issues: response,
          fetchStatus: fetchStates.completeWithData
        });
      } else {
        this.setState({
          issues: null,
          fetchStatus: fetchStates.completeWithoutData
        });
      }
    } catch (e) {
      this.setState({
        issues: null,
        fetchStatus: fetchStates.error
      });
    }
  }

  handleClick(e) {
    this.getIssues();
  }

  render() {
    const { repo } = this.props;
    const { fetchStatus, issues } = this.state;
    const WithNoIssues = () => null;

    //TODO - extract to <WithData/> component in future
    const HandleFetchStatus = {
      [fetchStates.completeWithoutData]: <WithNoIssues />,
      [fetchStates.completeWithData]: <WithIssues issues={issues} />,
      [fetchStates.error]: <Error />,
      [fetchStates.loading]: <Loading />,
      [fetchStates.idle]: null
    };

    return (
      <li onClick={e => this.handleClick(e)}>
        {repo.name} <ul>{HandleFetchStatus[fetchStatus]}</ul>
      </li>
    );
  }
}

export default Repo;
