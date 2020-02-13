import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import fetchMock from "fetch-mock";
import assert from "assert";

import { CreateOrder } from "../CreateOrder";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

describe("Tests CreateOrder component", () => {
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
    ],
    fields: [
      {
        value: "",
        _id: "5dcac8a093dd3b05f8cb0adc",
        name: "Мобильный телефон",
        __v: 0
      },
      {
        value: "",
        _id: "5df9f19e1607be20381256e8",
        name: "Номер паспорта",
        __v: 0
      },
      {
        value: "",
        _id: "5dfa29e98ef6f51a186c395e",
        name: "Домашний тел",
        __v: 0
      },
      {
        value: "",
        _id: "5e00b1bfa63229263405fd21",
        name: "Паспорт",
        __v: 0
      }
    ]
  };

  it("+++ renderer component", () => {
    const wrapper = shallow(<CreateOrder {...mapStateToProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("+++ simulation of a change event on the text field(order name)", () => {
    const wrapper = shallow(<CreateOrder {...mapStateToProps} />);

    const textFieldWrapper = wrapper.find(TextField).first();
    textFieldWrapper.simulate("change", {
      target: { value: "Some name for order" }
    });

    expect(
      wrapper
        .find(TextField)
        .first()
        .props().value
    ).toBe("Some name for order");
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("+++ count the number of statuses and fields", () => {
    const wrapper = shallow(<CreateOrder {...mapStateToProps} />);

    const statusesWrapper = wrapper.find(MenuItem);
    expect(statusesWrapper.length).toEqual(mapStateToProps.statuses.length);

    const fieldsWrapper = wrapper.find(TextField);
    expect(fieldsWrapper.length).toEqual(mapStateToProps.fields.length + 1);
  });

  it("+++ simulation of a change event on the select status in select field", () => {
    const wrapper = shallow(<CreateOrder {...mapStateToProps} />);

    const selectWrapper = wrapper.find(Select).first();

    const { _id, name: value } = mapStateToProps.statuses[
      mapStateToProps.statuses.length - 1
    ];

    selectWrapper.simulate("change", {
      _targetInst: {
        stateNode: {
          _id
        }
      },
      target: {
        value
      }
    });

    expect(
      wrapper
        .find(Select)
        .first()
        .props().value
    ).toBe(value);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("simulation of a change event on the text field", () => {
    const wrapper = shallow(<CreateOrder {...mapStateToProps} />);

    const textFieldWrapper = wrapper.find(TextField).last();
    const { name } = mapStateToProps.fields[mapStateToProps.fields.length - 1];

    textFieldWrapper.simulate("change", { target: { value: name, name } });

    expect(
      wrapper
        .find(TextField)
        .last()
        .props().value
    ).toBe(name);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("+++ sending data to create an order (success)", async () => {
    fetchMock.mock("/api/orders", {
      body: {
        message: "Ваша заявка успешно добавлена"
      },
      status: 201
    });

    const res = await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({
        fields: mapStateToProps.fields,
        name: "Some order name",
        status: {
          ...mapStateToProps.statuses[0]
        }
      })
    });

    assert(res);
    fetchMock.restore();
  });
});
