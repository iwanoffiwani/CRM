import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import { SearchBar } from "../SearchBar";

describe("Tests SearchBar component", () => {
  it("+++ renderer component", () => {
    const wrapper = shallow(<SearchBar />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
