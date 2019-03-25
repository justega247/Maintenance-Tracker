import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { startFetchAdminRequests } from "../actions/request";
import AdminRequestList from "./AdminRequestList";

export class AdminRequestPage extends Component {
  componentDidMount = () => {
    const { FetchRequests } = this.props;
    FetchRequests();
  };

  render() {
    return (
      <div>
        <AdminRequestList />
      </div>
    );
  }
}

AdminRequestPage.propTypes = {
  FetchRequests: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  FetchRequests: bindActionCreators(startFetchAdminRequests, dispatch)
});

export default connect(
  undefined,
  mapDispatchToProps
)(AdminRequestPage);
