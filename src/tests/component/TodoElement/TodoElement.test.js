import React from "react";
import {shallow} from "enzyme";
import {TodoElement} from "../../../component/TodoElement/TodoElement";

it("must render todo element", () => {
    const todoElement = <TodoElement/>;
    expect(todoElement).toBeTruthy();
});

it("must render todo element with todo", () => {
    const expectedTodo = "write some code";
    const todo = shallow(<TodoElement todo={expectedTodo}/>);

    expect(todo.text()).toBe(expectedTodo);
});

it("must render todo with prefix '(Completed)' if completed", () => {
    const expectedTodo = "write some code";
    const todo = shallow(<TodoElement todo={expectedTodo} completed={true}/>);

    expect(todo.text()).toBe(`(Completed) ${expectedTodo}`);
});