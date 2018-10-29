import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/auth/LoginPage';

let startUserLogin;
let wrapper;
let history;

describe('Login Page', () => {
  beforeEach(() => {
    startUserLogin = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<LoginPage
      startUserLogin={startUserLogin}
      history={history}
    />);
  });

  test('should correctly render LoginPage', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should set username on input change', () => {
    const value = 'tommy';
    const name = 'username';
    wrapper.find('input').at(0).simulate('change', {
      target: { name, value },
    });
    expect(wrapper.state(name)).toBe(value);
  });

  test('should set password on input change', () => {
    const value = 'passing';
    const name = 'password';
    wrapper.find('input').at(1).simulate('change', {
      target: { name, value },
    });
    expect(wrapper.state(name)).toBe(value);
  });

  test('should return error for invalid form submission', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault: () => { },
    });
    expect(wrapper.state('errors')).not.toBe({});
    expect(wrapper).toMatchSnapshot();
  });

  test('should call startUserLogin props for valid form submission', () => {
    const validDetails = {
      username: 'allison',
      password: 'passing',
    };

    wrapper.setState(validDetails);
    wrapper.find('form').simulate('submit', {
      preventDefault: () => { },
    });
    expect(startUserLogin).toHaveBeenCalledWith(validDetails, history);
    expect(wrapper).toMatchSnapshot();
  });
});
