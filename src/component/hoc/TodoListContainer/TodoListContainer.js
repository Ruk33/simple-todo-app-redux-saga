import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TodoInput } from "component/presentational/TodoInput/TodoInput";
import { TodoList } from "component/presentational/TodoList/TodoList";
import { SaveTodosButton } from "component/presentational/SaveTodosButton/SaveTodosButton";
import {
    addTodoRequest,
    setTodoInput,
    completeTodo,
    incompleteTodo
} from "./TodoListContainerAction";

export class TodoListContainer extends React.Component {
    static propTypes = {
        todo: PropTypes.string,
        onSaveTodo: PropTypes.func,
        onChangeTodo: PropTypes.func,
        onCompleteTodo: PropTypes.func,
        onIncompleteTodo: PropTypes.func,
        todos: PropTypes.arrayOf(
            PropTypes.shape({
                todo: PropTypes.string,
                completed: PropTypes.bool
            })
        )
    };

    /**
     * @param {Object} props
     * @param {string} props.todo
     * @param {(todo: string) => void} props.onSaveTodo
     * @param {(todo: string) => void} props.onChangeTodo
     * @param {(todo: string) => void} props.onCompleteTodo
     * @param {(todo: string) => void} props.onIncompleteTodo
     * @param {{todo: string, completed: boolean}[]} props.todos
     */
    constructor(props) {
        super(props);
        this.handleSaveTodo = this.handleSaveTodo.bind(this);
    }

    handleSaveTodo() {
        this.props.onSaveTodo(this.props.todo);
    }

    render() {
        return (
            <section>
                <TodoInput
                    value={this.props.todo}
                    onChange={this.props.onChangeTodo}
                />
                <SaveTodosButton onClick={this.handleSaveTodo} />
                <TodoList
                    todos={this.props.todos}
                    onCompleteTodo={this.props.onCompleteTodo}
                    onIncompleteTodo={this.props.onIncompleteTodo}
                />
            </section>
        );
    }
}

export const TodoListContainerConnected = connect(
    state => ({
        todo: state.todoListContainer.todo,
        todos: state.todoListContainer.todos
    }),
    {
        onSaveTodo: addTodoRequest,
        onChangeTodo: setTodoInput,
        onCompleteTodo: completeTodo,
        onIncompleteTodo: incompleteTodo
    }
)(TodoListContainer);
