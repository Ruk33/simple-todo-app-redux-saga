import { get, map } from "lodash";
import {
    ADD_TODO_SUCCESS,
    COMPLETE_TODO,
    SET_TODO_INPUT,
    INCOMPLETE_TODO
} from "./TodoListContainerAction";

/**
 * @returns {{todo: string, todos: {todo: string, completed: boolean}[]}}
 */
function initialState() {
    return {
        todo: "",
        todos: []
    };
}

/**
 * @param {{todo: string, todos: {todo: string, completed: boolean}[]}} state
 * @param {string} todo
 * @returns {{todo: string, todos: {todo: string, completed: boolean}[]}}
 */
function setTodoInput(state, todo) {
    return { ...state, todo };
}

/**
 * @param {{todo: string, todos: {todo: string, completed: boolean}[]}} state
 * @param {string} newTodo
 * @returns {{todo: string, todos: {todo: string, completed: boolean}[]}}
 */
function addTodo(state, newTodo) {
    const todos = [...state.todos, { todo: newTodo, completed: false }];
    return { ...state, todos };
}

/**
 * @param {{todo: string, todos: {todo: string, completed: boolean}[]}} state
 * @param {string} completedTodo
 * @returns {{todo: string, todos: {todo: string, completed: boolean}[]}}
 */
function completeTodo(state, completedTodo) {
    const todos = map(state.todos, todo => ({
        ...todo,
        completed: completedTodo === get(todo, "todo")
    }));

    return { ...state, todos };
}

/**
 * @param {{todo: string, todos: {todo: string, completed: boolean}[]}} state
 * @param {string} incompletedTodo
 * @returns {{todo: string, todos: {todo: string, completed: boolean}[]}}
 */
function incompleteTodo(state, incompletedTodo) {
    const todos = map(state.todos, todo => ({
        ...todo,
        completed:
            incompletedTodo === get(todo, "todo") ? false : todo.completed
    }));

    return { ...state, todos };
}

/**
 * @param {{todo: string, todos: {todo: string, completed: boolean}[]}} state
 * @param {{type: string, payload: {}} | undefined} action
 */
export function todoListContainerReducer(
    state = initialState(),
    action = undefined
) {
    switch (get(action, "type")) {
        case SET_TODO_INPUT:
            return setTodoInput(state, get(action, "payload.todo"));
        case ADD_TODO_SUCCESS:
            return addTodo(state, get(action, "payload.todo"));
        case COMPLETE_TODO:
            return completeTodo(state, get(action, "payload.todo"));
        case INCOMPLETE_TODO:
            return incompleteTodo(state, get(action, "payload.todo"));
        default:
            return state;
    }
}
