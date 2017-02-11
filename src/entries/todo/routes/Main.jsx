import React, { Component } from 'react'
import { connect } from 'react-redux'
import Checkbox from '../components/Checkbox'


@connect(store => {
    return {
        user: store.user
    }
})
export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            data: [{
                id: 1,
                status: false,
                title: 'Item 1'
            }, {
                id: 2,
                status: true,
                title: 'Item 2'
            }, {
                id: 3,
                status: false,
                title: 'Item 3'
            }, {
                id: 4,
                status: false,
                title: 'Item 4'
            }, {
                id: 5,
                status: false,
                title: 'Item 5'
            }]
        }
    };

    /**
     * Change item status
     * @param  {ObjcetId} Item id
     * @param  {Boolean} Item status
     */
    checkItem = (id, status) => {
        this.state.data[this.state.data.findIndex(e => e.id == id)].status = status

        this.setState({
            data: this.state.data
        })
    };

    /**
     * Handle input change
     * @param  {Proxy event} event
     */
    handleInput = event => {
        const { value } = event.target;
        this.setState({ title: value });
    }

    /**
     * Push new item
     * @param  {Proxy event} event
     */
    push = event => {
        event.preventDefault();

        const data = this.state.data.concat({
            id: Math.random(),
            title: this.state.title,
            status: false
        });

        this.setState({ title: '', data });
    };

    render() {
        const { icon, name, email } = this.props.user;
        const { title } = this.state

        return(
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
                                
                                {this.state.data.map(item => 
                                    <li className="todos__item" key={item.id}>
                                        <Checkbox id={item.id} checked={item.status} onChange={this.checkItem} />
                                        <span className="todos__item--title">{item.title}</span>
                                    </li>
                                )}

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
