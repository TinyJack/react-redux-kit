import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from '../components/Checkbox';
import Trash from '../components/Trash';
import { todosActions } from '../actions';

@connect(state => ({
    todos: state.todos,
}))
export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
        };

        /** Bind actions to component */
        this.actions = bindActionCreators(todosActions, this.props.dispatch);
    }

    componentWillMount() {
        /**
         * Fetch todos list
         */
        this.actions.fetchList();
    }

    /**
     * Change item status
     * @param  {ObjcetId} Item id
     */
    checkItem = id => {
        this.actions.checkItem(id);
    };

    /**
     * Handle input change
     * @param  {Proxy event} event
     */
    handleInput = event => {
        const { value } = event.target;
        this.setState({ title: value });
    };

    /**
     * Delete item
     * @param id
     */
    deleteItem = id => this.actions.deleteItem(id);

    /**
     * Push new item
     * @param  {Proxy event} event
     */
    push = event => {
        event.preventDefault();

        const { title } = this.state;

        this.actions.pushItem(title);
        this.setState({ title: '' });
    };

    render() {
        const { title } = this.state;
        const { data } = this.props.todos;

        return (
            <div className="todos">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="panel">
                            <form className="panel--header todos__form" onSubmit={this.push}>
                                <input type="text" className="input todos__form--input" placeholder="New todo" onChange={this.handleInput} value={title} />
                                <button className="button button--red todos__form--submit">
                                    Push
                                </button>
                            </form>
                            <ul className="panel--body">
                                {data.map(item =>
                                    <li className="todos__item" key={item.id}>
                                        <Checkbox id={item.id} checked={item.status}
                                            onChange={this.checkItem}
                                        />
                                        <span className="todos__item--title">{item.title}</span>
                                        <Trash id={item.id} onClick={this.deleteItem} />
                                    </li>,
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
