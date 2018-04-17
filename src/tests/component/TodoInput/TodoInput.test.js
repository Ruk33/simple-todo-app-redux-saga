import React from "react";
import { shallow } from "enzyme";

import { TodoInput } from "../../../component/TodoInput/TodoInput";

it("must render component input with text", () => {
    const expectedTodo = "write some code";
    const todoInput = shallow(<TodoInput value={expectedTodo} />);
    expect(todoInput.find("input").prop("value")).toBe(expectedTodo);
});

it("must call function when input change with the new input value", done => {
    const insertedValue = "some value";
    /**
     * @param {string} newValue
     */
    const inputChangeHandler = newValue => {
        expect(insertedValue).toBe(newValue);
        done();
    };
    const todoInput = shallow(<TodoInput onChange={inputChangeHandler} />);
    todoInput.simulate("change", { target: { value: insertedValue } });
});
