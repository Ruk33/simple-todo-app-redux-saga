import {get, map} from "lodash";
import {ADD_TODO_SUCCESS, COMPLETE_TODO} from "./TodoListContainerAction";

function addTodo(state, newTodo) {
    return [...state, { todo: newTodo, completed: false }];
}

function completeTodo(state, completedTodo) {
    return map(state, (todo) => ({ ...todo, completed: completedTodo === get(todo, "todo") }));
}

export function todoListContainerReducer(state = [], action) {
    switch (get(action, "type")) {
        case ADD_TODO_SUCCESS:
            return addTodo(state, get(action, "payload.todo"));
        case COMPLETE_TODO:
            return completeTodo(state, get(action, "payload.todo"));
        default:
            return state;
    }
}