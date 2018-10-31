import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LoginPage from '../../components/auth/LoginPage';

let startUserLogin;
let wrapper;

const createMockStore = configureMockStore([thunk]);
const store = createMockStore({});

describe('Login Page', () => {
  beforeEach(() => {
    startUserLogin = jest.fn();
    wrapper = shallow(<LoginPage.WrappedComponent
      startUserLogin={startUserLogin}
      store={store}
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
    expect(startUserLogin).toHaveBeenCalledWith(validDetails);
    expect(wrapper).toMatchSnapshot();
  });

  test('should redirect user', () => {
    const wrapper1 = shallow(<LoginPage.WrappedComponent
      startUserLogin={startUserLogin}
      store={store}
      auth
      userId={1}
    />);
    expect(wrapper1).toMatchSnapshot();
  });
});
