import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import Spinner from '../../../Elements/Spinner'
import { getAllReferralForms } from '../../../../actions/referralActions';

class ReferralFormList extends Component {

    componentDidMount() {
        this.props.dispatch(getAllReferralForms(this.props.profileId))
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

    render() {
        let table = this.props.loading === true ? (
            <Spinner />
        ) : (
                <div className="table-responsive mg-t-0">
                    <div className="section-wrapper">
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
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.referralForms.map((referral, index) => {
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
                                                </tr>
                                            </React.Fragment>
                                        );
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
    loading: state.referrals.loading ? state.referrals.loading : false,
    referralForms: state.referrals.referralForms ? state.referrals.referralForms : []
})

export default withRouter(connect(
    mapStateToProps
)(ReferralFormList))