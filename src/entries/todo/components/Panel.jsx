import React, { Component } from 'react';

export default class Panel extends Component {
    /**
     * Handle input change
     */
    selectAll = () => { this.props.selectAll(); };

    render() {
        const { select } = this.props;
        return (
            <div>
                <div className="panel--tools">
                    <button type="button" className="button--grey" onClick={this.selectAll}>
                        <i className="material-icons">playlist_add_check</i>
                        <span>{select ? 'unselect all' : 'select all'}</span>
                    </button>
                </div>
                <ul className="panel--body" onClick={this.setEdit}>
                    {this.props.children}
                </ul>
            </div>
        );
    }
}
