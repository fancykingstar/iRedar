import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Spinner from '../../../Elements/Spinner';

export default function AdminReferralList({ submissionList, loading }) {
  let table =
    loading === true ? (
      <Spinner />
    ) : (
      <div className="table-responsive mg-t-40">
        <table className="table table-invoice">
          <thead>
            <tr>
              <th className="wd-20p">Last Name</th>
              <th className="wd-40p">First Name</th>
              <th className="tx-center">Form Name</th>
              <th className="tx-right">Date Submitted</th>
              <th className="tx-right"> </th>
            </tr>
          </thead>
          <tbody>
            {submissionList.map(submission => {
              const content = submission.content;
              return (
                <React.Fragment key={submission._id}>
                  <tr>
                    <td>{content.lastName}</td>
                    <td className="tx-12">{content.firstName} </td>
                    <td className="tx-center">{content.fromForm} </td>
                    <td className="tx-right">
                      {moment(submission.dateSubmitted).format(
                        'MMMM Do YYYY, h:mm a'
                      )}
                    </td>
                    <td className="tx-right">
                      <Link
                        to={`/forms/${content.fromForm}/${submission._id}`}
                        className="tx-right"
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>{table}</div>
  );
}
