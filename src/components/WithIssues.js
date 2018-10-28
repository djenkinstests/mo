import React from "react";

const WithIssues = ({ issues }) =>
  issues && issues.map(issue => <li key={issue.id}>{issue.title}</li>);

export default WithIssues;
