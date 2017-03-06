import React, { Component } from 'react';

export default class Panel extends Component {
    /**
     * Select all items
     */
    selectAll = () => { this.props.selectAll(); };

    /**
     * delete all items
     */
    deleteAll = () => { this.props.deleteAll(); };

    render() {
        const { select } = this.props;
        return (
            <div>
                <div className="panel--tools">
                    <button type="button" className="button--grey panel--button" onClick={this.selectAll}>
                        <i className="material-icons">playlist_add_check</i>
                        <span>{select ? 'unselect all' : 'select all'}</span>
                    </button>

                    <button type="button" className="button--grey panel--button" onClick={this.deleteAll}>
                        <i className="material-icons">delete_forever</i>
                        <span>delete all</span>
                    </button>
                </div>
                <ul className="panel--body" onClick={this.setEdit}>
                    {this.props.children}
                </ul>
            </div>
        );
    }
}
