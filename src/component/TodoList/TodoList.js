import React from "react";
import PropTypes from "prop-types";
import {TodoElement} from "../TodoElement/TodoElement";

export class TodoList extends React.Component {
    static propTypes = {
        todos: PropTypes.arrayOf(PropTypes.shape({
            todo: PropTypes.string,
            completed: PropTypes.bool
        }))
    };

    buildTodoElement(todo) {
        return (
            <li>
                <TodoElement
                    todo={todo.todo}
                    completed={todo.completed}
                />
            </li>
        );
    }

    render() {
        return (
            <ul>
                {this.props.todos.map(this.buildTodoElement)}
            </ul>
        );
    }
}