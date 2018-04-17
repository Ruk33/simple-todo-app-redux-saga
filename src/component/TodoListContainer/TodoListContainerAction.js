import { call, put, takeLatest } from "redux-saga/effects";
import { addTodoService } from "../../service/TodoService";

export const ADD_TODO_REQUEST = "ADD_TODO_REQUEST";
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
export const ADD_TODO_ERROR = "ADD_TODO_ERROR";
export const COMPLETE_TODO = "COMPLETE_TODO";
export const INCOMPLETE_TODO = "INCOMPLETE_TODO";
export const SET_TODO_INPUT = "SET_TODO_INPUT";

export function* sagaWatcher() {
    yield takeLatest(ADD_TODO_REQUEST, addTodo);
}

/**
 * @param {string} todo
 */
export const setTodoInput = todo => ({
    type: SET_TODO_INPUT,
    payload: { todo }
});

/**
 * @param {string} todo
 */
export const addTodoRequest = todo => ({ type: ADD_TODO_REQUEST, todo });

export function* addTodo({ todo }) {
    try {
        yield call(addTodoService, { todo });
        yield put(addTodoSuccess(todo));
    } catch (error) {
        yield put(addTodoError(error));
    }
}

/**
 * @param {string} todo
 */
export const addTodoSuccess = todo => ({
    type: ADD_TODO_SUCCESS,
    payload: { todo }
});

/**
 * @param {string} error
 */
export const addTodoError = error => ({
    type: ADD_TODO_ERROR,
    payload: { error }
});

/**
 * @param {string} todo
 */
export const completeTodo = todo => ({
    type: COMPLETE_TODO,
    payload: { todo }
});

/**
 * @param {string} todo
 */
export const incompleteTodo = todo => ({
    type: INCOMPLETE_TODO,
    payload: { todo }
});
