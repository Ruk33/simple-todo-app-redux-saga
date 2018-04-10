import React from "react";
import PropTypes from "prop-types";

export class TodoElement extends React.Component {
    static propTypes = {
        todo: PropTypes.string,
        completed: PropTypes.bool
    };

    render() {
        return this.props.completed ? `(Completed) ${this.props.todo}` : this.props.todo;
    }
}