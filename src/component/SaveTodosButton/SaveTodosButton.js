import React from "react";
import PropTypes from "prop-types";

export class SaveTodosButton extends React.Component {
    static propTypes = {
        onClick: PropTypes.func
    };

    render() {
        return <button onClick={this.props.onClick}>Save ToDos</button>;
    }
}
