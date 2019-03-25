import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AdminRequestListItem from "./AdminRequestListItem";

export const AdminRequestList = ({ requests }) => (
  <table>
    <thead>
      <tr>
        <th>Requester</th>
        <th>Title</th>
        <th>Type</th>
        <th>Manage</th>
        <th>Created</th>
      </tr>
    </thead>
    <tbody>
      {requests.map(request => (
        <AdminRequestListItem key={request.id} request={request} />
      ))}
    </tbody>
  </table>
);

AdminRequestList.propTypes = {
  requests: PropTypes.instanceOf(Array).isRequired
};

const mapStateToProps = state => ({
  requests: state.requests.requests
});

export default connect(mapStateToProps)(AdminRequestList);
