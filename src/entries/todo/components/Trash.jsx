import React, { Component } from 'react';

export default class Trash extends Component {

    /**
     * Handle click
     * @param
     */
    handleClick = () => {
        const { id } = this.props;
        this.props.onClick(id);
    };

    render() {
        return (
            <button className="button--grey" type="button" onClick={this.handleClick} title="Delete">
                <i className="material-icons">delete</i>
            </button>
        );
    }
}
