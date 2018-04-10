import React from "react";
import PropTypes from "prop-types";

export class TodoInput extends React.Component {
    static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func
    };

    render() {
        return <input value={this.props.value} onChange={this.props.onChange}/>;
    }
}