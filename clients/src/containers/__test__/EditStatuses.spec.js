import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import fetchMock from "fetch-mock";
import assert from "assert";

import { EditStatuses } from "../EditStatuses";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import ListItemText from "@material-ui/core/ListItemText";

describe("Tests EditStatuses component", () => {
  const mapStateToProps = {
    statuses: [
      {
        _id: "5e28378cfa502c1edc0e7689",
        name: "Статус-1",
        __v: 0
      },
      {
        _id: "5e283799fa502c1edc0e768b",
        name: "Статус-2",
        __v: 0
      },
      {
        _id: "5e28379ffa502c1edc0e768c",
        name: "Статус-4",
        __v: 0
      },
      {
        _id: "5e2837a5fa502c1edc0e768d",
        name: "Статус-5",
        __v: 0
      }
    ]
  };

  it("+++ renderer EditStatuses component", () => {
    const wrapper = shallow(<EditStatuses {...mapStateToProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("+++ simulation of a click event on the status editing button", () => {
    const wrapper = shallow(<EditStatuses {...mapStateToProps} />);

    const editButtonWrapper = wrapper.find(Fab).at(0);
    editButtonWrapper.simulate("click");

    const textFieldWrapper = wrapper.find(TextField).at(0);
    expect(textFieldWrapper.props().value).toBe(
      mapStateToProps.statuses[0].name
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("+++ simulation of status name change", () => {
    const wrapper = shallow(<EditStatuses {...mapStateToProps} />);

    const addButtonWrapper = wrapper.find(Fab).last();
    addButtonWrapper.simulate("click");

    const textFieldWrapper = wrapper.find(TextField).at(0);
    expect(textFieldWrapper.props().value).toBe("");

    textFieldWrapper.simulate("change", {
      target: { value: "Some status name" }
    });
    expect(
      wrapper
        .find(TextField)
        .at(0)
        .props().value
    ).toBe("Some status name");

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("+++ fetch a new status name", async () => {
    // Конструктор new URLSearchParams() не имеет поддержки в IE*
    const url = new URL("http://localhost:5000/api/statuses");
    const params = { id: mapStateToProps.statuses[0]._id };

    url.search = new URLSearchParams(params).toString();

    fetchMock.mock(url, 200);

    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        name: "Some new status name"
      })
    });

    assert(res);
    fetchMock.restore();
  });

  it("+++ simulation of a click event on the status delete button", () => {
    const wrapper = shallow(<EditStatuses {...mapStateToProps} />);

    const deleteButtonWrapper = wrapper.find(Fab).at(1);
    deleteButtonWrapper.simulate("click");

    const listItemTextWrapper = wrapper.find(ListItemText).at(0);
    expect(listItemTextWrapper.props().primary).toBe(
      "Вы уверены, что хотите удалить это поле безвозвратно?"
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("+++ fetch delete status", async () => {
    // Конструктор new URLSearchParams() не имеет поддержки в IE*
    const url = new URL("http://localhost:5000/api/statuses");
    const params = { id: mapStateToProps.statuses[0]._id };

    url.search = new URLSearchParams(params).toString();

    fetchMock.mock(url, 200);

    const res = await fetch(url, { method: "DELETE" });

    assert(res);
    fetchMock.restore();
  });

  it("+++ simulation of a click event on the status clear button", () => {
    const wrapper = shallow(<EditStatuses {...mapStateToProps} />);

    const editButtonWrapper = wrapper.find(Fab).at(0);
    editButtonWrapper.simulate("click");

    expect(toJson(wrapper)).toMatchSnapshot();

    const clearButtonWrapper = wrapper.find(Fab).at(1);
    clearButtonWrapper.simulate("click");

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("+++ simulation of a click event on the status add button", () => {
    const wrapper = shallow(<EditStatuses {...mapStateToProps} />);

    const addButtonWrapper = wrapper.find(Fab).last();
    addButtonWrapper.simulate("click");

    const textFieldWrapper = wrapper.find(TextField).at(0);
    expect(textFieldWrapper.props().value).toBe("");

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("+++ simulation of adding name a new status", () => {
    const wrapper = shallow(<EditStatuses {...mapStateToProps} />);

    const addButtonWrapper = wrapper.find(Fab).last();
    addButtonWrapper.simulate("click");

    const textFieldWrapper = wrapper.find(TextField).at(0);
    expect(textFieldWrapper.props().value).toBe("");

    textFieldWrapper.simulate("change", {
      target: { value: "Some status name" }
    });
    expect(
      wrapper
        .find(TextField)
        .at(0)
        .props().value
    ).toBe("Some status name");

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("+++ fetch add new status", async () => {
    fetchMock.mock("http://localhost:5000/api/statuses", 201);

    const res = await fetch("http://localhost:5000/api/statuses", {
      method: "POST",
      body: {
        name: "Some a new status name"
      }
    });

    assert(res);
    fetchMock.restore();
  });
});
