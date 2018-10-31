import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { startFetchRequests } from '../actions/request';
import RequestList from './RequestList';


export class UserRequestPage extends Component {
  componentDidMount = () => {
    const { FetchRequests } = this.props;
    FetchRequests();
  }

  render() {
    return (
      <div>
        <RequestList />
      </div>
    );
  }
}

UserRequestPage.propTypes = {
  FetchRequests: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  FetchRequests: bindActionCreators(startFetchRequests, dispatch),
});

export default connect(undefined, mapDispatchToProps)(UserRequestPage);
