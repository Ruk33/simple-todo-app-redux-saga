import {todoListContainerReducer} from "../../../component/TodoListContainer/TodoListContainerReducer";
import {addTodoSuccess, completeTodo} from "../../../component/TodoListContainer/TodoListContainerAction";

it("must start todo list empty", () => {
    const todos = todoListContainerReducer();
    expect(todos.length).toBe(0);
});

it("must add todo to list", () => {
    const newTodo = "write some code";
    const todos = todoListContainerReducer(undefined, addTodoSuccess(newTodo));

    expect(todos.length).toBe(1);
    expect(todos[0].todo).toBe(newTodo);
});

it("must mark todo as completed when completed", () => {
    const newTodo = "write some code";
    const todos = todoListContainerReducer(undefined, addTodoSuccess(newTodo));
    const todosWithNewTodoCompleted = todoListContainerReducer(todos, completeTodo(newTodo));

    expect(todosWithNewTodoCompleted[0].completed).toBeTruthy();
});