import { todoListContainerReducer } from "../../../../component/hoc/TodoListContainer/TodoListContainerReducer";
import {
    addTodoSuccess,
    completeTodo,
    setTodoInput,
    incompleteTodo
} from "../../../../component/hoc/TodoListContainer/TodoListContainerAction";

it("must start todo list empty", () => {
    const todoListContainer = todoListContainerReducer();
    expect(todoListContainer.todos.length).toBe(0);
});

it("must add todo to list", () => {
    const newTodo = "write some code";
    const todoListContainer = todoListContainerReducer(
        undefined,
        addTodoSuccess(newTodo)
    );
    const todos = todoListContainer.todos;

    expect(todos.length).toBe(1);
    expect(todos[0].todo).toBe(newTodo);
});

it("must mark todo as completed when completed", () => {
    const newTodo = "write some code";
    const todos = todoListContainerReducer(undefined, addTodoSuccess(newTodo));
    const todosWithNewTodoCompleted = todoListContainerReducer(
        todos,
        completeTodo(newTodo)
    ).todos;

    expect(todosWithNewTodoCompleted[0].completed).toBeTruthy();
});

it("must mark todo as incompleted when incompleted", () => {
    const newTodo = "write some code";
    const todos = todoListContainerReducer(undefined, addTodoSuccess(newTodo));
    const todosWithNewTodoCompleted = todoListContainerReducer(
        todos,
        completeTodo(newTodo)
    );
    const todosWithNewTodoIncompleted = todoListContainerReducer(
        todosWithNewTodoCompleted,
        incompleteTodo(newTodo)
    ).todos;

    expect(todosWithNewTodoIncompleted[0].completed).toBeFalsy();
});

it("must start todo input as empty text", () => {
    expect(todoListContainerReducer().todo).toBe("");
});

it("must set todo input", () => {
    const todoInput = "writing some todo";
    const todoListContainer = todoListContainerReducer(
        undefined,
        setTodoInput(todoInput)
    );

    expect(todoListContainer.todo).toBe(todoInput);
});