import React, { Component } from 'react'
import ReferralFormList from './ReferralFormList'

export default class Referral extends Component {

    render() {
        return (
            <div className="container">
            	<div className="slim-pageheader">
		            <ol className="breadcrumb slim-breadcrumb" />
		            <h6 className="slim-pagetitle">Referral</h6>
		          </div>
                <ReferralFormList />
            </div>
        )
    }
}