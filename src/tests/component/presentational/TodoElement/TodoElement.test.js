import React from "react";
import { shallow } from "enzyme";
import { TodoElement } from "component/presentational/TodoElement/TodoElement";

it("must render todo element", () => {
    const todoElement = <TodoElement />;
    expect(todoElement).toBeTruthy();
});

it("must render todo element with todo", () => {
    const expectedTodo = "write some code";
    const todo = shallow(<TodoElement todo={expectedTodo} />);

    expect(todo.text()).toBe(expectedTodo);
});

it("must render todo with prefix '(Completed)' if completed", () => {
    const expectedTodo = "write some code";
    const todo = shallow(<TodoElement todo={expectedTodo} completed={true} />);

    expect(todo.text()).toBe(`(Completed) ${expectedTodo}`);
});

it("must complete todo when clicking on an incompleted todo", done => {
    const todo = "write some code";
    /**
     * @param {string} completedTodo
     */
    const completeTodoHandler = completedTodo => {
        expect(todo).toBe(completedTodo);
        done();
    };
    const todoElement = shallow(
        <TodoElement todo={todo} onCompleteTodo={completeTodoHandler} />
    );

    todoElement.simulate("click");
});

it("must incomplete todo when clicking on completed todo", done => {
    const todo = "write code on the laptop";
    /**
     * @param {string} incompletedTodo
     */
    const inCompleteTodoHandler = incompletedTodo => {
        expect(todo).toBe(incompletedTodo);
        done();
    };
    const todoElement = shallow(
        <TodoElement
            todo={todo}
            completed={true}
            onIncompleteTodo={inCompleteTodoHandler}
        />
    );

    todoElement.simulate("click");
});
