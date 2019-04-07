import React, { Component } from 'react'
import ReferralFormList from './ReferralFormList'

export default class Referral extends Component {

    componentDidMount() {
        window.history2 = this.props.history
    }

    render() {
        return (
            <div className="container">
                <ReferralFormList />
            </div>
        )
    }
}