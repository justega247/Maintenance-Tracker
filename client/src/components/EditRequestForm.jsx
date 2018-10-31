import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ValidateRequests from '../utils/requestValidation';
import Button from './common/Button';
import { startFetchRequest, startEditRequest } from '../actions/request';


export class EditRequestForm extends Component {
  state = {
    title: '',
    type: '',
    description: '',
    errors: {},
  }

  componentDidMount = () => {
    const { match, fetchRequest } = this.props;
    if (match && match.params.id) {
      fetchRequest(match.params.id)
        .then((payload) => {
          const { title, type, description } = payload.data.data.request;
          return this.setState(() => ({
            title,
            type,
            description,
          }));
        });
    }
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const { errors, hasErrors } = ValidateRequests.requestDataValidation(this.state);
    this.setState(() => ({
      errors,
    }));
    if (!hasErrors) {
      const { title, type, description } = this.state;
      const { startUpdateRequest, history, match } = this.props;
      startUpdateRequest(match.params.id, { title, type, description }, history);
    }
  };

  render() {
    const { errors } = this.state;

    const types = [{ type: 'repairs' }, { type: 'maintenance' }];

    return (
      <div className="create__request">
        <div>
          <div>
            <h1 className="create__request-title">Edit Request</h1>
          </div>
        </div>
        <div className="content-container">
          <div className="request__form">
            <form onSubmit={this.onSubmit}>
              <div>
                <label htmlFor="type" className="label request__label">
              Type:
                  <select
                    name="type"
                    value={this.state.type}
                    onChange={this.onChange}
                    className="request__type"
                  >
                    {
                types.map(data => (
                  <option value={data.type} key={data.type}>
                    {data.type}
                  </option>
                ))
                }
                  </select>
                </label>
              </div>
              <div>
                <label htmlFor="title" className="label request__label">
              Title:
                  <div>
                    <input
                      name="title"
                      type="text"
                      placeholder="enter a title"
                      className="form__input"
                      value={this.state.title}
                      onChange={this.onChange}
                    />
                  </div>
                </label>
                {errors.title &&
                  errors.title.map(error => (
                    <div className="form__error" key={error}>
                      {error}
                    </div>
                  ))}
              </div>
              <div>
                <label htmlFor="description" className="label request__label">
              Description:
                  <div>
                    <textarea
                      name="description"
                      placeholder="enter a description"
                      className="form__input"
                      value={this.state.description}
                      onChange={this.onChange}
                    />
                  </div>
                </label>
                {errors.description &&
                  errors.description.map(error => (
                    <div className="form__error" key={error}>
                      {error}
                    </div>
                  ))}
              </div>
              <div>
                <Button type="submit" className="button--big" text="Edit Request" />
              </div>
            </form>
          </div>
        </div>
      </div>

    );
  }
}

EditRequestForm.defaultProps = {
  fetchRequest: () => {},
  startUpdateRequest: () => {},
  match: {},
};

EditRequestForm.propTypes = {
  fetchRequest: PropTypes.func,
  startUpdateRequest: PropTypes.func,
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.instanceOf(Object),
};

const mapDispatchToProps = dispatch => ({
  fetchRequest: bindActionCreators(startFetchRequest, dispatch),
  startUpdateRequest: bindActionCreators(startEditRequest, dispatch),
});

export default connect(null, mapDispatchToProps)(EditRequestForm);

