import React, { Component } from 'react'
import ReferralFormList from './ReferralFormList'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

export default class Referral extends Component {

    render() {
        return (
            <div className="container">
            	<div className="slim-pageheader">
		            <Breadcrumb>
                      <Breadcrumb.Item href="../dashboard">Home</Breadcrumb.Item>
                      <Breadcrumb.Item active>Referral</Breadcrumb.Item>
                    </Breadcrumb>
		            <h6 className="slim-pagetitle">Referral</h6>
		        </div>
                <ReferralFormList />
            </div>
        )
    }
}