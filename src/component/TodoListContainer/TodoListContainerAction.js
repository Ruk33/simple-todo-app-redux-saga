import {call, put, takeLatest} from "redux-saga/effects";
import {addTodoService} from "../../service/TodoService";

export const ADD_TODO_REQUEST = "ADD_TODO_REQUEST";
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
export const ADD_TODO_ERROR = "ADD_TODO_ERROR";
export const COMPLETE_TODO = "COMPLETE_TODO";

export function* sagaWatcher() {
    yield takeLatest(ADD_TODO_REQUEST, addTodo);
}

export const addTodoRequest = () => ({ type: ADD_TODO_REQUEST });

export function* addTodo({todo}) {
    try {
        const result = yield call(addTodoService, { todo });
        yield put(addTodoSuccess(todo));
    } catch (error) {
        yield put(addTodoError(error));
    }
}

export const addTodoSuccess = (todo) => ({
    type: ADD_TODO_SUCCESS,
    payload: { todo }
});

export const addTodoError = (error) => ({
    type: ADD_TODO_ERROR,
    payload: { error }
});

export const completeTodo = (todo) => ({
    type: COMPLETE_TODO,
    payload: { todo }
});