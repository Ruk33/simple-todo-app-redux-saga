import React from "react";
import {shallow} from "enzyme";

import {TodoInput} from "../../../component/TodoInput/TodoInput";

it("must render component input with text", () => {
    const expectedTodo = "write some code";
    const todoInput = shallow(<TodoInput value={expectedTodo}/>);
    expect(todoInput.find("input").prop("value")).toBe(expectedTodo);
});

it("must call function when input change", (done) => {
    const todoInput = shallow(<TodoInput onChange={done}/>);
    todoInput.simulate("change");
});