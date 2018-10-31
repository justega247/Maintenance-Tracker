import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RequestListItem from './RequestListItem';

export const RequestList = ({ requests }) => (
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Type</th>
        <th>Status</th>
        <th>Details</th>
        <th>Edit</th>
      </tr>
    </thead>
    <tbody>
      {requests.map(request => <RequestListItem key={request.id} request={request} />)}
    </tbody>
  </table>
);

RequestList.propTypes = {
  requests: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = state => ({
  requests: state.requests,
});

export default connect(mapStateToProps)(RequestList);

