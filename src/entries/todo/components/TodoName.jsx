import React, { Component } from 'react';

export default class TodoName extends Component {
    constructor(props) {
        super(props);
        this.state = { disable: true };
        this.value = this.props.value;
    }
    /**
     * Handle input change
     */
    handleChange = () => {
        const { id } = this.props;
        this.props.onChange(id);
    };

    /**
     *
     */
    handleClick = () => {
        this.setState({ disable: false });
    };

    /**
     *
     */
    handleBlur = () => {
        this.setState({ disable: true });
    };

    render() {
        const inputClass = `todos__item--input ${this.state.disable ? 'disable' : ''}`;
        return (
            <input className={inputClass} onBlur={this.handleBlur}
                type="text" onClick={this.handleClick} value={this.value} onChange={this.handleChange}
            />
        );
    }
}
