import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

let wrapper;

describe('Header', () => {
  beforeEach(() => {
    const props = {
      auth: true,
      userId: 1,
    };
    wrapper = shallow(<Header {...props} />);
  });
  test('should correctly render Header', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render correct header when user is not the admin', () => {
    const props = {
      auth: true,
      userId: 2,
    };
    const wrapper1 = shallow(<Header {...props} />);
    expect(wrapper1).toMatchSnapshot();
  });

  test('should render correct header when user is not logged in', () => {
    const props = {
      auth: false,
      userId: 2,
    };
    const wrapper1 = shallow(<Header {...props} />);
    expect(wrapper1).toMatchSnapshot();
  });

  test('should start the logout action on button click', () => {
    const startLogout = jest.fn();
    const wrapper1 = shallow(<Header auth userId={2} startLogout={startLogout} />);
    wrapper1.find('Button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
  });
});
