import React, { Component } from 'react';

export default class Trash extends Component {
    componentWillMount() {
        this.id = Math.random();
    }

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
            <div className="trash">
                <i className="material-icons">delete</i>
            </div>
        );
    }
}
