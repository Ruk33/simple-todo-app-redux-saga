import * as Redux from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { todoListContainerReducer } from "./component/hoc/TodoListContainer/TodoListContainerReducer";
import { sagaWatcher } from "./component/hoc/TodoListContainer/TodoListContainerAction";

function getReducers() {
    return Redux.combineReducers({
        todoListContainer: todoListContainerReducer
    });
}

export function createStore() {
    const reducers = getReducers();
    const sagaMiddleWare = createSagaMiddleware();
    const store = Redux.createStore(
        reducers,
        composeWithDevTools(Redux.applyMiddleware(sagaMiddleWare))
    );

    sagaMiddleWare.run(sagaWatcher); // <- personal note, i hate this

    return store;
}
