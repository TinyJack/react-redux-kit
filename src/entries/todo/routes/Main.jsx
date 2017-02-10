import React, { Component } from 'react'
import { connect } from 'react-redux'


@connect(store => {
    return {
        user: store.user
    }
})
export default class Main extends Component {
    render() {
        const { icon, name, email } = this.props.user;

        return(
            <div className="todos">... todos ...</div>
        );
    }
}
