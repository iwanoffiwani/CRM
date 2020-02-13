import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import { TableOrders } from "../Table";
import Fab from "@material-ui/core/Fab";

describe("Tests Table component", () => {
  const mapStateToProps = {
    user: {
      login: "test@test"
    },
    columns: [
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
    ],
    rows: [
      {
        _id: "5e28371aa7b3b8210c9d38de",
        name: "Новая заявка-35",
        user: "5da47a1353265a14c80ef289",
        fields: [
          {
            value: "+7 666 666 66 66",
            _id: "5dcac8a093dd3b05f8cb0adc",
            name: "Мобильный телефон"
          },
          {
            value: "79 98 666 555",
            _id: "5df9f19e1607be20381256e8",
            name: "Номер паспорта"
          },
          {
            value: "516 69 69 ",
            _id: "5dfa29e98ef6f51a186c395e",
            name: "Домашний тел"
          },
          {
            value: "79 98 654 654",
            _id: "5e00b1bfa63229263405fd21",
            name: "Паспорт"
          }
        ],
        status: {
          _id: "5e28379ffa502c1edc0e768c",
          name: "Статус-4"
        },
        comments: [],
        changes: [
          {
            data: "2020-01-22T11:53:27.209Z",
            _id: "5e2837b7fa502c1edc0e768e",
            user: "test@test",
            previousState: {
              status: "None"
            },
            nextState: {
              status: "Статус-2"
            }
          }
        ]
      }
    ],
    search: [],
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

  it("+++ renderer component", () => {
    const wrapper = shallow(<TableOrders {...mapStateToProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("+++ simulation of a click event on the order editing button", () => {
    const wrapper = shallow(<TableOrders {...mapStateToProps} />);

    const editButtonWrapper = wrapper.find(Fab).at(0);
    editButtonWrapper.simulate("click");

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
