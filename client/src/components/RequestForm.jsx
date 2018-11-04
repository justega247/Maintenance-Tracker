import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ValidateRequests from '../utils/requestValidation';
import Button from './common/Button';
import { startFetchRequest } from '../actions/request';


export class RequestForm extends Component {
  state = {
    title: '',
    type: 'repairs',
    description: '',
    errors: {},
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
      this.props.onSubmit({
        title,
        type,
        description,
      });
    }
  };
  render() {
    const { errors } = this.state;

    const types = [{ type: 'repairs' }, { type: 'maintenance' }];

    return (
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
            <Button type="submit" className="button--big" text="Save Request" />
          </div>
        </form>
      </div>

    );
  }
}

RequestForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchRequest: bindActionCreators(startFetchRequest, dispatch),
});

export default connect(null, mapDispatchToProps)(RequestForm);
