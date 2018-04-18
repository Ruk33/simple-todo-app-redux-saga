import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";

export class TodoInput extends React.Component {
    static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func
    };

    /**
     * @param {{value: string, onChange: (value: string) => void}} props
     */
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    /**
     * @param {{target: {value: string}}} event
     */
    handleInputChange(event) {
        const inputValue = get(event, "target.value");
        this.props.onChange(inputValue);
    }

    render() {
        return (
            <input value={this.props.value} onChange={this.handleInputChange} />
        );
    }
}
