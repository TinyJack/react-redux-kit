import React, { Component } from 'react';
import Checkbox from './Checkbox';
import Trash from './Trash';
import Panel from './Panel';
import TodoName from './TodoName';

export default class Container extends Component {
    render() {
        const { select, data, title, disable } = this.props;
        return (
            <div className="todos">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="panel">
                            <form className="panel--header todos__form" onSubmit={this.props.push}>
                                <input type="text" className="input todos__form--input" placeholder="New todo" onChange={this.props.handleInput} value={title} />
                                <button className="button button--red todos__form--submit">
                                    Push
                                </button>
                            </form>
                            <Panel selectAll={this.props.selectAll}
                                deleteAll={this.props.deleteAll} select={select}
                            >
                                {data.map(item =>
                                    <li className="todos__item" key={item.id}>
                                        <Checkbox id={item.id} checked={item.status}
                                            onChange={this.props.checkItem}
                                        />
                                        <TodoName value={item.title} id={item.id}
                                            disable={disable} checked={item.status}
                                            onChange={this.props.editItem}
                                        />
                                        <Trash id={item.id} onClick={this.props.deleteItem} />
                                    </li>,
                                )}
                            </Panel>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
