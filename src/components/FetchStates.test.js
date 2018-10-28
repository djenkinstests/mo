import React from "react";
import { Error, Loading } from "./FetchStates";
import { shallow } from "enzyme";

describe("<Error/>", () => {
  it("renders as expected", () => {
    const component = shallow(<Error />);
    expect(component).toMatchSnapshot();
  });
});

describe("<Loading/>", () => {
  it("renders as expected", () => {
    const component = shallow(<Loading />);
    expect(component).toMatchSnapshot();
  });
});
