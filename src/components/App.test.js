import React from "react";
import { shallow } from "enzyme";
import App from "./App";

it("Renders as expected", () => {
  const component = shallow(<App />);
  expect(component).toMatchSnapshot();
});
