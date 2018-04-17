import React from "react";
import { shallow } from "enzyme";
import {
    TodoListContainer,
    TodoListContainerConnected
} from "../../../component/TodoListContainer/TodoListContainer";
import { TodoInput } from "../../../component/TodoInput/TodoInput";
import { TodoList } from "../../../component/TodoList/TodoList";
import { SaveTodosButton } from "../../../component/SaveTodosButton/SaveTodosButton";
import { createStore } from "../../../store";
import {
    addTodoSuccess,
    setTodoInput,
    addTodoRequest
} from "../../../component/TodoListContainer/TodoListContainerAction";

it("must render the todo list container", () => {
    const todoContainer = <TodoListContainer />;
    expect(todoContainer).toBeTruthy();
});

it("must render a todo input inside of the todo list container", () => {
    const todoContainer = shallow(<TodoListContainer />);
    expect(todoContainer.find(TodoInput).exists()).toBeTruthy();
});

it("must render a todo input with the todo passed to the todo list container", () => {
    const todo =
        "write some code, and try to have a little bit more imagination to write these todos";
    const todoContainer = shallow(<TodoListContainer todo={todo} />);
    const todoInput = todoContainer.find(TodoInput);
    expect(todoInput.prop("value")).toBe(todo);
});

it("must render a save todo button in the todo list container", () => {
    const todoContainer = shallow(<TodoListContainer />);
    expect(todoContainer.find(SaveTodosButton).exists()).toBeTruthy();
});

it("must render a save todo button with the save handler passed to the todo list container", done => {
    const writeCode = "write some todo";

    /**
     * @param {string} todo
     */
    const saveTodoHandler = todo => {
        expect(todo).toBe(writeCode);
        done();
    };
    const todoContainer = shallow(
        <TodoListContainer todo={writeCode} onSaveTodo={saveTodoHandler} />
    );
    const saveButton = todoContainer.find(SaveTodosButton);
    saveButton.simulate("click");
});

it("must render a list of todos inside of the todo list container", () => {
    const todoContainer = shallow(<TodoListContainer />);
    expect(todoContainer.find(TodoList).exists()).toBeTruthy();
});

it("must render a todo list with all the todos passed to the todo list container", () => {
    const todos = [
        {
            todo: "write a different todo from 'write some code'",
            completed: true
        },
        {
            todo: "make some mate (the argentinian beverage, you know the one)",
            completed: false
        }
    ];

    const todoContainer = shallow(<TodoListContainer todos={todos} />);
    const todoList = todoContainer.find(TodoList);
    expect(todoList.prop("todos")).toBe(todos);
});

it("must render a connected todo list container", () => {
    const connected = <TodoListContainerConnected />;
    expect(connected).toBeTruthy();
});

it("must pass the todos of the todoListContainer reducer to the connected todo list container", () => {
    const store = createStore();

    const makePizza = "make some pizza!";
    store.dispatch(addTodoSuccess(makePizza));

    const connectedTodoList = shallow(
        <TodoListContainerConnected store={store} />
    );

    const todos = connectedTodoList.prop("todos");

    expect(todos[0].todo).toBe(makePizza);
});

it("must pass the todo of the todoListContainer reducer to the todo input", () => {
    const store = createStore();

    const readCodeComplete = "read code complete";
    store.dispatch(setTodoInput(readCodeComplete));

    const connectedTodoList = shallow(
        <TodoListContainerConnected store={store} />
    );

    const todoInput = connectedTodoList.prop("todo");

    expect(todoInput).toBe(readCodeComplete);
});

it("must use add todo request as todo save handler", () => {
    const store = createStore();
    const connectedTodoList = shallow(
        <TodoListContainerConnected store={store} />
    );

    const usedSaveTodoHandler = connectedTodoList.prop("onSaveTodo");
    const someTodo = "some non important todo";

    expect(usedSaveTodoHandler(someTodo)).toEqual(addTodoRequest(someTodo));
});
