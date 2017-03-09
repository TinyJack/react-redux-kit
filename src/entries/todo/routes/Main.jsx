import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Container from '../components/Container';
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
        this.actions.selectAll(false);
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
        const { data, select } = this.props.todos;

        return (
            <Container title={title} disable={disable} push={this.push}
                data={data} select={select} selectAll={this.selectAll} deleteAll={this.deleteAll}
                checkItem={this.checkItem} deleteItem={this.deleteItem} editItem={this.editItem}
                handleInput={this.handleInput}
            />
        );
    }
}
