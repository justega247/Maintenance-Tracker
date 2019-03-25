import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "./common/Button";

const formatDate = date => {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();

  const createdAt = `${day}/${month}/${year}`;
  return createdAt;
};
const AdminRequestListItem = ({ request }) => (
  <tr>
    <td data-label="Requester">{request.requested_by}</td>
    <td data-label="Title">{request.title}</td>
    <td data-label="Type">{request.type}</td>
    <td data-label="Manage">
      <Link to={`/admin-view-request/${request.id}`}>
        <Button type="button" text="Manage" className="details" />
      </Link>
    </td>
    <td data-label="Created">{formatDate(request.created_at)}</td>
  </tr>
);

AdminRequestListItem.propTypes = {
  request: PropTypes.instanceOf(Object).isRequired
};

export default AdminRequestListItem;
