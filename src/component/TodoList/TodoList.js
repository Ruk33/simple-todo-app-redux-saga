import React from "react";
import PropTypes from "prop-types";
import { map, get } from "lodash";
import { TodoElement } from "../TodoElement/TodoElement";

export class TodoList extends React.Component {
    static propTypes = {
        todos: PropTypes.arrayOf(
            PropTypes.shape({
                todo: PropTypes.string,
                completed: PropTypes.bool
            })
        )
    };

    /**
     * @param {{todo: string, completed: boolean}} todo
     */
    buildTodoElement(todo) {
        return (
            <TodoElement
                todo={get(todo, "todo")}
                completed={get(todo, "completed")}
            />
        );
    }

    render() {
        /**
         * @param {{todo: string, completed: boolean}} todo
         * @param {number} key
         */
        const buildTodoList = (todo, key) => {
            return <li key={key}>{this.buildTodoElement(todo)}</li>;
        };
        const todos = map(this.props.todos, buildTodoList);

        return <ul>{todos}</ul>;
    }
}
