import React, { Component } from 'react'

export default class Checkbox extends Component {
    componentWillMount() {
        this.id = Math.random();
    };

    /**
     * Handle input change
     * @param  {Proxy event} event
     */
    handleChange = event => {
        const { checked, id } = this.props;
        this.props.onChange(id, !checked);
    }

    render() {
        const { checked } = this.props;

        return(
            <div className="checkbox">
                <input className="checkbox--input" type="checkbox" id={this.id} onChange={this.handleChange} checked={checked} />
                <label className="checkbox--label" htmlFor={this.id}></label>
            </div>
        );
    };
}
