import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from '../components/Checkbox';
import Trash from '../components/Trash';
import Panel from '../components/Panel';
import TodoName from '../components/TodoName';
import { todosActions } from '../actions';

@connect(state => ({
    todos: state.todos,
}))
export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            disable: true,
        };

        this.select = false;

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
    checkItem = (id, status) => {
        this.actions.checkItem(id, status);
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
     * Delete all items
     * @param id
     */
    deleteAll = () => this.actions.deleteAll();

    /**
     * Edit item
     * @param id
     * @param title
     */
    editItem = (id, title) => { this.actions.editItem({ id, title }); };

    selectAll = () => {
        this.actions.selectAll(!this.select);
    };

    /**
     * Push new item
     * @param  {Proxy event} event
     */
    push = event => {
        event.preventDefault();
        const { title } = this.state;
        if (!String(title)) return;
        this.actions.pushItem(title);
        this.setState({ title: '' });
    };

    render() {
        const { title, disable } = this.state;
        const { data } = this.props.todos;
        this.select = data.every(item => item.status);

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
                            <Panel selectAll={this.selectAll}
                                deleteAll={this.deleteAll} select={this.select}
                            >
                                {data.map(item =>
                                    <li className="todos__item" key={item.id}>
                                        <Checkbox id={item.id} checked={item.status}
                                            onChange={this.checkItem}
                                        />
                                        <TodoName value={item.title} id={item.id}
                                            disable={disable} checked={item.status}
                                            onChange={this.editItem}
                                        />
                                        <Trash id={item.id} onClick={this.deleteItem} />
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
