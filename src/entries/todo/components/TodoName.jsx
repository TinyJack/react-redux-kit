import React, { Component } from 'react';

export default class TodoName extends Component {
    /**
     * Handle input change
     */
    handleChange = event => {
        const { id } = this.props;
        this.props.onChange(id, event.target.value);
    };

    render() {
        const { value } = this.props;
        return (
            <input className="todos__item--input" onBlur={this.handleBlur}
                type="text" onClick={this.handleClick} value={value} onChange={this.handleChange}
            />
        );
    }
}
