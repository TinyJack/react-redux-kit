import React, { Component } from 'react';

export default class TodoName extends Component {
    /**
     * Handle input change
     */
    handleChange = event => {
        const { id } = this.props;
        this.props.onChange(id, event.target.value);
    };

    /**
     *
     */
    handleBlur = () => {
        // this.setState({ disable: true });
    };

    render() {
        const { disable, value } = this.props;
        const inputClass = `todos__item--input ${disable ? 'disable' : ''}`;
        return (
            <input className={inputClass} onBlur={this.handleBlur}
                type="text" onClick={this.handleClick} value={value} onChange={this.handleChange}
            />
        );
    }
}
