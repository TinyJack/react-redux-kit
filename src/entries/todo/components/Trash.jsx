import React, { Component } from 'react';

export default class Trash extends Component {

    /**
     * Handle input change
     * @param  {Proxy event} event
     */
    handleClick = () => {
        const { id } = this.props;
        this.props.onClick(id);
    };

    render() {
        return (
            <button className="trash" type="button" onClick={this.handleClick}>
                <i className="material-icons">delete</i>
            </button>
        );
    }
}
