import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedHeader, { Header } from '../../components/Header';

let wrapper;
let props;

const createMockStore = configureMockStore([thunk]);
const store = createMockStore({
  auth: {
    isAuthenticated: true,
    user: {
      id: 2,
    },
  },
});
describe('Header', () => {
  beforeEach(() => {
    props = {
      auth: true,
      userId: 1,
    };
    wrapper = shallow(<Header {...props} />);
  });
  test('should correctly render Header', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render correct header when user is not the admin', () => {
    const props1 = {
      auth: true,
      userId: 2,
    };
    const wrapper1 = shallow(<Header {...props1} />);
    expect(wrapper1).toMatchSnapshot();
  });

  test('should render correct header when user is not logged in', () => {
    const props2 = {
      auth: false,
      userId: 2,
    };
    const wrapper1 = shallow(<Header {...props2} />);
    expect(wrapper1).toMatchSnapshot();
  });

  test('should start the logout action on button click', () => {
    const startLogout = jest.fn();
    const wrapper1 = shallow(<Header auth userId={2} startLogout={startLogout} />);
    wrapper1.find('.logout__link').simulate('click');
    expect(startLogout).toHaveBeenCalled();
  });

  test('should render connected component', () => {
    wrapper = shallow(<ConnectedHeader store={store} {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
