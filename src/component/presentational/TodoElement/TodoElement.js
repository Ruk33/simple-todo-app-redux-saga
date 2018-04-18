import React from "react";
import PropTypes from "prop-types";

export class TodoElement extends React.Component {
    static propTypes = {
        todo: PropTypes.string,
        completed: PropTypes.bool,
        onCompleteTodo: PropTypes.func,
        onIncompleteTodo: PropTypes.func
    };

    buildCompletedTodo() {
        const incompleteTodoHandler = () =>
            this.props.onIncompleteTodo(this.props.todo);
        return (
            <div onClick={incompleteTodoHandler}>
                (Completed) {this.props.todo}
            </div>
        );
    }

    buildTodo() {
        const completeTodoHandler = () =>
            this.props.onCompleteTodo(this.props.todo);
        return <div onClick={completeTodoHandler}>{this.props.todo}</div>;
    }

    render() {
        return this.props.completed
            ? this.buildCompletedTodo()
            : this.buildTodo();
    }
}
