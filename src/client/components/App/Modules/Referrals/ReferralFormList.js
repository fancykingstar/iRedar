import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import Spinner from '../../../Elements/Spinner'
import { getAllReferralForms, deleteReferral } from '../../../../actions/referralActions';

class ReferralFormList extends Component {

    constructor() {
        super();
        this.state = {
            showFilterDropdown: false,
            received: true,
            sent: true
        };
    }

    componentDidMount() {
        console.log("profileId:",this.props.profileId);
        const { getAllReferralForms } = this.props;
        getAllReferralForms(this.props.profileId);
        window.$('#referralFormTable').DataTable({
            responsive: true,
            bInfo: false,
            language: {
                searchPlaceholder: 'Search...',
                sSearch: '',
                lengthMenu: '_MENU_ items/page',
            }
        });
    }

    viewDetail = event => {
        let referralId = event.target.getAttribute('referral_Id')
        this.props.history.push('/referrals/detail/' + referralId)
    }

    changeSent = () => {
        let self = this;
        this.setState({sent: !self.state.sent});
    };

    changeReceive = () => {
        let self = this;
        this.setState({received: !self.state.received});
    }

    delete = event => {
        if (window.confirm('Do you want to delete referral?')) {
            const { deleteReferral } = this.props;
            // deleteReferral();
            let referralId = event.target.getAttribute('referral_Id');
            deleteReferral(referralId);
        }
    }
    
    detail = referral => {
        this.props.history.push({
          pathname: `/forms/${referral.formName}/${referral.submission}`,
          state: { edit: 'false' }
        });
    }

    render() {
        console.log(this.props.referralForms);
        let { sent, received } = this.state;
        let table = this.props.loading === true ? (
            <Spinner />
        ) : (
                <div className="table-responsive mg-t-0">
                    <div className="section-wrapper">
                        <div className="row" style={{marginTop: "10px", marginBottom: "20px", paddingRight:"10px", paddingLeft:"10px"}}>
                            <div className='dropdown'>
                                <button className='btn btn-primary btn-sm dropdown-toggle mg-l-5' type='button' id='dropdownMenuButton12' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                                    <i className='fa fa-filter'/> Filter
                                </button>
                                <div className='dropdown-menu' aria-labelledby='dropdownMenuButton12' x-placement='bottom-start'>
                                    <a className='dropdown-item' href='#' onClick={() => {}}>
                                        <input type='checkbox' checked={this.state.received} onChange={() => {this.changeReceive()}}/> Referrals Received</a>
                                    <a className='dropdown-item' href='#' onClick={() => {}}>
                                        <input type='checkbox' checked={this.state.sent} onChange={() => {this.changeSent()}}/> Referrals Sent</a>
                                </div>
                            </div>                            
                        </div>
                        <table className="table table-invoice" id="referralFormTable">
                            <thead>
                                <tr>
                                    <th className="wd-5p">Id</th>
                                    <th className="wd-15p">Last Name</th>
                                    <th className="wd-15p">First Name</th>
                                    <th className="wd-15p">Form Name</th>
                                    <th className="wd-15p">Sender Name</th>
                                    <th className="wd-20p">Date Submitted</th>
                                    <th className="tx-right"> </th>
                                    <th className="tx-right"> </th>
                                    <th className="tx-right"> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.referralForms.map((referral, index) => {
                                        console.log(received);
                                        if (!received && this.props.profileId == referral.sender._id && sent) { 
                                                return (
                                                    <React.Fragment key={referral._id}>
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td className="tx-12">{referral.lastName}</td>
                                                            <td className="tx-12">{referral.firstName} </td>
                                                            <td className="tx-12">{referral.formName} </td>
                                                            <td className="tx-12">{referral.sender.firstName} </td>
                                                            <td className="tx-12">{moment(referral.dateSubmitted).format('MMM Do YYYY, h:mm a')} </td>
                                                            <td className="tx-right">
                                                                <button type="button" className="btn btn-primary btn-sm" onClick={this.viewDetail} referral_id={referral._id} >Detail</button>
                                                            </td>
                                                            <td>
                                                                <button type="button" className="btn btn-primary btn-sm" onClick={()=>this.detail(referral)}>Form</button>
                                                            </td>
                                                            <td>
                                                                <div className='dropdown'>
                                                                    <button className='btn btn-primary btn-sm dropdown-toggle mg-l-5' type='button' id='dropdownMenuButton12' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                                                                        <i className='fa fa-bolt'/> Action
                                                                    </button>
                                                                    <div className='dropdown-menu' aria-labelledby='dropdownMenuButton12' x-placement='bottom-start'>
                                                                        <a className='dropdown-item' href='#' onClick={() => {}}>
                                                                          <i className='fa fa-file'/> Archive Referral
                                                                        </a>
                                                                        <a className='dropdown-item' href='#' onClick={this.delete} referral_id={referral._id}>
                                                                          <i className='fa fa-trash'/> Delete Referral
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </React.Fragment>
                                                );
                                            }
                                        if (!sent && received) {

                                            let k = 0;
                                            referral.receivers.map((receiver, index) => {
                                                if (receiver._id == this.props.profileId) return;
                                                k++;
                                            })
                                            if (k < referral.receivers.length){ 
                                                return (
                                                    <React.Fragment key={referral._id}>
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td className="tx-12">{referral.lastName}</td>
                                                            <td className="tx-12">{referral.firstName} </td>
                                                            <td className="tx-12">{referral.formName} </td>
                                                            <td className="tx-12">{referral.sender.firstName} </td>
                                                            <td className="tx-12">{moment(referral.dateSubmitted).format('MMM Do YYYY, h:mm a')} </td>
                                                            <td className="tx-right">
                                                                <button type="button" className="btn btn-primary btn-sm" onClick={this.viewDetail} referral_id={referral._id} >Detail</button>
                                                            </td>
                                                            <td>
                                                                <button type="button" className="btn btn-primary btn-sm" onClick={()=>this.detail(referral)}>Form</button>
                                                            </td>
                                                            <td>
                                                                <div className='dropdown'>
                                                                    <button className='btn btn-primary btn-sm dropdown-toggle mg-l-5' type='button' id='dropdownMenuButton12' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                                                                        <i className='fa fa-bolt'/> Action
                                                                    </button>
                                                                    <div className='dropdown-menu' aria-labelledby='dropdownMenuButton12' x-placement='bottom-start'>
                                                                        <a className='dropdown-item' href='#' onClick={() => {}}>
                                                                          <i className='fa fa-file'/> Archive notifications
                                                                        </a>
                                                                        <a className='dropdown-item' href='#' onClick={this.delete} referral_id={referral._id}>
                                                                          <i className='fa fa-trash'/> Delete notifications
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </React.Fragment>
                                                );
                                            }
                                        }

                                        if (sent && received) {
                                            return (
                                                    <React.Fragment key={referral._id}>
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td className="tx-12">{referral.lastName}</td>
                                                            <td className="tx-12">{referral.firstName} </td>
                                                            <td className="tx-12">{referral.formName} </td>
                                                            <td className="tx-12">{referral.sender.firstName} </td>
                                                            <td className="tx-12">{moment(referral.dateSubmitted).format('MMM Do YYYY, h:mm a')} </td>
                                                            <td className="tx-right">
                                                                <button type="button" className="btn btn-primary btn-sm" onClick={this.viewDetail} referral_id={referral._id} >Detail</button>
                                                            </td>
                                                            <td>
                                                                <button type="button" className="btn btn-primary btn-sm" onClick={()=>this.detail(referral)}>Form</button>
                                                            </td>
                                                            <td>
                                                                <div className='dropdown'>
                                                                    <button className='btn btn-primary btn-sm dropdown-toggle mg-l-5' type='button' id='dropdownMenuButton12' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                                                                        <i className='fa fa-bolt'/> Action
                                                                    </button>
                                                                    <div className='dropdown-menu' aria-labelledby='dropdownMenuButton12' x-placement='bottom-start'>
                                                                        <a className='dropdown-item' href='#' onClick={() => {}}>
                                                                          <i className='fa fa-file'/> Archive notifications
                                                                        </a>
                                                                        <a className='dropdown-item' href='#' onClick={this.delete} referral_id={referral._id}>
                                                                          <i className='fa fa-trash'/> Delete notifications
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </React.Fragment>
                                                );
                                        }
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {table}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    profileId: state.auth.user.profileId,
    profile: state.auth.profile,
    loading: state.referrals.loading ? state.referrals.loading : false,
    referralForms: state.referrals.referralForms ? state.referrals.referralForms : []
})

export default withRouter(connect(
    mapStateToProps, {deleteReferral, getAllReferralForms}
)(ReferralFormList))