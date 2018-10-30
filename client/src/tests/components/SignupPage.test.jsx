import React from 'react';
import { shallow } from 'enzyme';
import { SignupPage } from '../../components/auth/SignupPage';

let startUserRegister;
let wrapper;
let history;

describe('Signup Page', () => {
  beforeEach(() => {
    startUserRegister = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<SignupPage
      startUserRegister={startUserRegister}
      history={history}
    />);
  });

  test('should correctly render SignupPage', () => {
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

  test('should set fullname on input change', () => {
    const value = 'tommy joe';
    const name = 'fullname';
    wrapper.find('input').at(1).simulate('change', {
      target: { name, value },
    });
    expect(wrapper.state(name)).toBe(value);
  });

  test('should set email on input change', () => {
    const value = 'tommy@gmail.com';
    const name = 'email';
    wrapper.find('input').at(2).simulate('change', {
      target: { name, value },
    });
    expect(wrapper.state(name)).toBe(value);
  });

  test('should set password on input change', () => {
    const value = 'tommyjoe';
    const name = 'password';
    wrapper.find('input').at(3).simulate('change', {
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

  test('should call startUserSignUp props for valid form submission', () => {
    const validDetails = {
      username: 'allison',
      fullname: 'alli paterson',
      email: 'all2@gmail.com',
      password: 'passing',
    };
    wrapper.setState(validDetails);
    wrapper.find('form').simulate('submit', {
      preventDefault: () => { },
    });
    expect(startUserRegister).toHaveBeenCalledWith(validDetails, history);
    expect(wrapper).toMatchSnapshot();
  });
});
