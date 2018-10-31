import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import RequestForm from './RequestForm';
import { startAddRequest } from '../actions/request';

export class CreateRequestPage extends Component {
  onSubmit = (request) => {
    const { startCreateRequest, history } = this.props;
    startCreateRequest(request, history);
  };

  render() {
    return (
      <div className="create__request">
        <div>
          <div>
            <h1 className="create__request-title">Add Request</h1>
          </div>
        </div>
        <div className="content-container">
          <RequestForm
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}

CreateRequestPage.defaultProps = {
  startCreateRequest: () => {},
};

CreateRequestPage.propTypes = {
  startCreateRequest: PropTypes.func,
  history: PropTypes.shape({}).isRequired,
};

const mapDispatchToProps = dispatch => ({
  startCreateRequest: bindActionCreators(startAddRequest, dispatch),
});

export default connect(undefined, mapDispatchToProps)(CreateRequestPage);
