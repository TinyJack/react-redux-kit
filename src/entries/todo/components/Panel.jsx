import React, { Component } from 'react';

export default class Panel extends Component {
    render() {
        const { select, selectAll, deleteAll } = this.props;
        return (
            <div>
                <div className="panel--tools">
                    <button type="button" className="button--grey panel--button" onClick={selectAll}>
                        <i className="material-icons">playlist_add_check</i>
                        <span>{select ? 'unselect all' : 'select all'}</span>
                    </button>

                    <button type="button" className="button--grey panel--button" onClick={deleteAll}>
                        <i className="material-icons">delete_forever</i>
                        <span>delete all</span>
                    </button>
                </div>
                <ul className="panel--body">
                    {this.props.children}
                </ul>
            </div>
        );
    }
}
