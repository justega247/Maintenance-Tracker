import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  startFetchRequest,
  startAdminRequestResolve,
  startAdminRequestDisapprove,
  startAdminRequestApprove
} from "../actions/request";
import Button from "./common/Button";

export class AdminRequestDetails extends Component {
  componentDidMount = () => {
    const { match, fetchRequest } = this.props;
    if (match && match.params.id) {
      fetchRequest(match.params.id);
    }
  };

  onApprove = () => {
    const { match, approveRequest } = this.props;
    if (match && match.params.id) {
      approveRequest(match.params.id);
    }
  };

  onDisapprove = () => {
    const { match, disapproveRequest } = this.props;
    if (match && match.params.id) {
      disapproveRequest(match.params.id);
    }
  };

  onResolve = () => {
    const { match, resolveRequest } = this.props;
    if (match && match.params.id) {
      resolveRequest(match.params.id);
    }
  };

  render() {
    const { userRequest } = this.props;
    const { id, title, type, status, description } = userRequest;

    return (
      <div className="view__div">
        <div className="view__request">
          <div className="req__item">
            <div className="req__value">id:</div>
            <div>{id}</div>
          </div>
          <div className="req__item">
            <div className="req__value">Title:</div>
            <div>{title}</div>
          </div>
          <div className="req__item">
            <div className="req__value">Type:</div>
            <div>{type}</div>
          </div>
          <div className="req__item">
            <div className="req__value">Status:</div>
            <div>{status}</div>
          </div>
          <div className="req__item">
            <div className="req__value">Description:</div>
            <div>{description}</div>
          </div>
          <div>
            <Button
              type="button"
              text="Approve"
              onClick={this.onApprove}
              className="admin_manage details"
            />
            <Button
              type="button"
              text="Disapprove"
              onClick={this.onDisapprove}
              className="admin_manage disapprove"
            />
            <Button
              type="button"
              text="Resolve"
              onClick={this.onResolve}
              className="admin_manage resolve"
            />
          </div>
        </div>
      </div>
    );
  }
}

AdminRequestDetails.defaultProps = {
  fetchRequest: () => {},
  userRequest: {},
  match: {}
};

AdminRequestDetails.propTypes = {
  fetchRequest: PropTypes.func,
  userRequest: PropTypes.instanceOf(Object),
  match: PropTypes.instanceOf(Object)
};

const mapStateToProps = state => ({
  userRequest: state.requests.request
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: bindActionCreators(startFetchRequest, dispatch),
  approveRequest: bindActionCreators(startAdminRequestApprove, dispatch),
  disapproveRequest: bindActionCreators(startAdminRequestDisapprove, dispatch),
  resolveRequest: bindActionCreators(startAdminRequestResolve, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminRequestDetails);
