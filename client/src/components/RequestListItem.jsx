import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from './common/Button';

const RequestListItem = ({ request }) => (
  <tr>
    <td data-label="Title">{request.title}</td>
    <td data-label="Type">{request.type}</td>
    <td data-label="Status">{request.status}</td>
    <td data-label="Details"><Link to={`users/requests/${request.id}`}><Button type="button" text="Details" className="details" /></Link></td>
    <td data-label="Edit"><Link to={`users/requests/${request.id}`}><Button type="button" text="Edit" className="edit" /></Link></td>
  </tr>
);

RequestListItem.propTypes = {
  request: PropTypes.instanceOf(Object).isRequired,
};

export default RequestListItem;
