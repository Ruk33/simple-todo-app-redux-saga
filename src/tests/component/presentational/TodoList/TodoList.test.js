import React from "react";
import { shallow, mount } from "enzyme";
import { TodoList } from "../../../../component/presentational/TodoList/TodoList";
import { TodoElement } from "../../../../component/presentational/TodoElement/TodoElement";

it("must render todo list", () => {
    const todoList = <TodoList />;
    expect(todoList).toBeTruthy();
});

it("must render array of todos as a list", () => {
    const todos = [
        { todo: "write some code", completed: false },
        { todo: "feed the cat", completed: true }
    ];

    const todoList = shallow(<TodoList todos={todos} />);
    const unsortedList = todoList.find("ul");

    expect(unsortedList.exists()).toBeTruthy();

    const elementsOfUnsortedList = unsortedList.find("li");

    expect(elementsOfUnsortedList.length).toBe(todos.length);

    expect(
        elementsOfUnsortedList
            .at(0)
            .contains(
                <TodoElement
                    todo={todos[0].todo}
                    completed={todos[0].completed}
                />
            )
    ).toBeTruthy();

    expect(
        elementsOfUnsortedList
            .at(1)
            .contains(
                <TodoElement
                    todo={todos[1].todo}
                    completed={todos[1].completed}
                />
            )
    ).toBeTruthy();
});

it("must call complete handler when clicking incompleted todo element", done => {
    const todos = [{ todo: "listen to Rich Hickey", completed: false }];
    /**
     * @param {string} completedTodo
     */
    const completeTodoHandler = completedTodo => {
        expect(completedTodo).toBe(todos[0].todo);
        done();
    };
    const todoList = mount(
        <TodoList todos={todos} onCompleteTodo={completeTodoHandler} />
    );
    const todoElement = todoList.find(TodoElement).first();

    todoElement.simulate("click");
});

it("must call incomplete handler when clicking on completed todo element", done => {
    const todos = [{ todo: "listen to Uncle Bob", completed: true }];
    /**
     * @param {string} incompletedTodo
     */
    const incompleteTodoHandler = incompletedTodo => {
        expect(incompletedTodo).toBe(todos[0].todo);
        done();
    };
    const todoList = mount(
        <TodoList todos={todos} onIncompleteTodo={incompleteTodoHandler} />
    );
    const todoElement = todoList.find(TodoElement).first();

    todoElement.simulate("click");
});
