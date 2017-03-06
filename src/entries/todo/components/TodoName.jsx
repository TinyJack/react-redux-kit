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
        const { value, checked } = this.props;
        const itemClass = `todos__item--input ${checked ? 'todos__item--checked' : ''}`;
        return (
            <input className={itemClass} onBlur={this.handleBlur}
                type="text" onClick={this.handleClick} value={value} onChange={this.handleChange}
            />
        );
    }
}
