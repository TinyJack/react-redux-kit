import React, { Component } from 'react'
import Auth from 'libs/auth'

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.auth = new Auth();
    }

    signIn = event => {
        event.preventDefault();

        this.auth.signIn()
    }

    render() {
        return(
            <div className="grid boxed auth">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12">
                        <form className="panel auth__form" onSubmit={this.signIn}>
                            <div className="panel--body">
                                <div className="auth__form--title">
                                    <h1>react-redux-kit</h1>
                                </div>
                                <div className="auth__form--controls">
                                    <span>Continue with</span>
                                    <button type="submit" className="button button--red">
                                        <img className="button-img" src="/images/github.svg" alt="GitHub" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
