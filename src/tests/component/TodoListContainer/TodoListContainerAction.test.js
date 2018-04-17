import { takeLatest, call, put } from "redux-saga/effects";
import {
    ADD_TODO_REQUEST,
    setTodoInput,
    addTodo,
    addTodoError,
    addTodoRequest,
    addTodoSuccess,
    completeTodo,
    sagaWatcher
} from "../../../component/TodoListContainer/TodoListContainerAction";
import { addTodoService } from "../../../service/TodoService";

it("must put a watcher to listen to the very last add todo request", () => {
    const watcher = sagaWatcher();
    expect(watcher.next().value).toEqual(takeLatest(ADD_TODO_REQUEST, addTodo));
});

it("must return SET_TODO_INPUT when writing the todo", () => {
    const todo = "some todo";
    expect(setTodoInput(todo)).toEqual({
        type: "SET_TODO_INPUT",
        payload: { todo }
    });
});

it("must return ADD_TODO_REQUEST when requesting to add a todo", () => {
    const todo = "write code!";
    expect(addTodoRequest(todo)).toEqual({ type: "ADD_TODO_REQUEST", todo });
});

it("must return ADD_TODO_SUCCESS with todo when adding a new todo", () => {
    const todoToAdd = "write some code";
    expect(addTodoSuccess(todoToAdd)).toEqual({
        type: "ADD_TODO_SUCCESS",
        payload: { todo: todoToAdd }
    });
});

it("must return ADD_TODO_ERROR with error when there is an error adding a new todo", () => {
    const errorAddingTodo = "some error";
    expect(addTodoError(errorAddingTodo)).toEqual({
        type: "ADD_TODO_ERROR",
        payload: { error: errorAddingTodo }
    });
});

it("must return COMPLETE_TODO when completing a todo", () => {
    const completedTodo = "write some code";
    expect(completeTodo(completedTodo)).toEqual({
        type: "COMPLETE_TODO",
        payload: { todo: completedTodo }
    });
});

it("must add todo using service and then dispatch an ADD_TODO_SUCCESS", () => {
    const todo = "write some code, yes... again";
    const addTodoGenerator = addTodo({ todo });

    const consumingService = addTodoGenerator.next().value;
    const dispatchingConsumeService = call(addTodoService, { todo });
    expect(consumingService).toEqual(dispatchingConsumeService);

    const afterConsumingService = addTodoGenerator.next().value;
    const dispatchingAddTodoSuccess = put(addTodoSuccess(todo));
    expect(afterConsumingService).toEqual(dispatchingAddTodoSuccess);
});

it("must dispatch a ADD_TODO_ERROR if there is an error when adding a new todo", () => {
    const addTodoGenerator = addTodo({ todo: "some really important todo" });

    const errorWhenAddingTodo = "some error";
    const dispatchingAddTodoError = put(addTodoError(errorWhenAddingTodo));

    addTodoGenerator.next();
    expect(addTodoGenerator.throw(errorWhenAddingTodo).value).toEqual(
        dispatchingAddTodoError
    );
});
