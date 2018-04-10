import React from "react";
import {shallow} from "enzyme";
import {TodoList} from "../../../component/TodoList/TodoList";
import {TodoElement} from "../../../component/TodoElement/TodoElement";

it("must render todo list", () => {
    const todoList = <TodoList/>;
    expect(todoList).toBeTruthy();
});

it("must render array of todos as a list", () => {
    const todos = [
        {todo: "write some code", completed: false},
        {todo: "feed the cat", completed: true}
    ];

    const todoList = shallow(<TodoList todos={todos}/>);
    const unsortedList = todoList.find("ul");

    expect(unsortedList.exists()).toBeTruthy();

    const elementsOfUnsortedList = unsortedList.find("li");

    expect(elementsOfUnsortedList.length).toBe(todos.length);

    expect(elementsOfUnsortedList.at(0).contains(
        <TodoElement
            todo={todos[0].todo}
            completed={todos[0].completed}
        />
    )).toBeTruthy();

    expect(elementsOfUnsortedList.at(1).contains(
        <TodoElement
            todo={todos[1].todo}
            completed={todos[1].completed}
        />
    )).toBeTruthy();
});