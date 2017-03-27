import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auth from '../../../libs/auth';

@connect(store => {
    return {
        user: store.user,
    };
})
export default class Aside extends Component {
    constructor(props) {
        super(props);
        this.auth = new Auth();
    }
    handleClick = () => {
        this.auth.signOut();
    };

    render() {
        const { icon, name, email } = this.props.user;
        return (
            <div className="aside">
                <div className="aside__header">
                    <img src={icon} alt={name} className="aside--icon" />
                    <div className="aside__header--titles">
                        <span className="aside--name">{name}</span>
                        <small className="aside--email">{email}</small>
                    </div>
                    <button className="button button--red aside--button" onClick={this.handleClick}>Sign Out</button>
                </div>
            </div>
        );
    }
}
