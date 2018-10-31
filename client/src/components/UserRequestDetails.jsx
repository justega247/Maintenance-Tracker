import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { startFetchRequest } from '../actions/request';
import Button from './common/Button';


export class UserRequestDetails extends Component {
  componentDidMount = () => {
    const { match, fetchRequest } = this.props;
    if (match && match.params.id) {
      fetchRequest(match.params.id);
    }
  }

  render() {
    const { userRequest } = this.props;
    const {
      id,
      title,
      type,
      status,
      description,
    } = userRequest;

    return (
      <div className="view__div">
        <div className="view__request">
          <div className="req__item"><div className="req__value">id:</div><div>{id}</div></div>
          <div className="req__item"><div className="req__value">Title:</div><div>{title}</div></div>
          <div className="req__item"><div className="req__value">Type:</div><div>{type}</div></div>
          <div className="req__item"><div className="req__value">Status:</div><div>{status}</div></div>
          <div className="req__item"><div className="req__value">Description:</div><div>{description}</div></div>
          <div><Link to={`/edit-request/${id}`}><Button type="button" text="Edit" className="edit" /></Link></div>
        </div>
      </div>

    );
  }
}

UserRequestDetails.defaultProps = {
  fetchRequest: () => {},
  userRequest: {},
  match: {},
};

UserRequestDetails.propTypes = {
  fetchRequest: PropTypes.func,
  userRequest: PropTypes.instanceOf(Object),
  match: PropTypes.instanceOf(Object),
};

const mapStateToProps = state => ({
  userRequest: state.requests.request,
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: bindActionCreators(startFetchRequest, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRequestDetails);
