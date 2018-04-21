import React, { Component } from "react";
import { TodoListContainerConnected } from "component/hoc/TodoListContainer/TodoListContainer";

class App extends Component {
    render() {
        return <TodoListContainerConnected />;
    }
}

export default App;
