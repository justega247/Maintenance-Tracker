import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedRequestForm, { RequestForm } from '../../components/RequestForm';
import mockData from '../__mocks__/mockData';

let wrapper;
let props;

const createMockStore = configureMockStore([thunk]);
const store = createMockStore({});
describe('RequestForm', () => {
  beforeEach(() => {
    props = {
      fetchRequest: jest.fn(),
      onSubmit: jest.fn(),
    };
    wrapper = shallow(<RequestForm {...props} />);
  });

  test('should render RequestForm correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should set title on input change', () => {
    const value = 'broken table';
    const name = 'title';
    wrapper.find('input').at(0).simulate('change', {
      target: { name, value },
    });
    expect(wrapper.state(name)).toBe(value);
  });

  test('should set type on input change', () => {
    const value = 'maintenance';
    const name = 'type';
    wrapper.find('select').at(0).simulate('change', {
      target: { name, value },
    });
    expect(wrapper.state(name)).toBe(value);
  });

  test('should set description on input change', () => {
    const value = 'broken tables are everywhere';
    const name = 'description';
    wrapper.find('textarea').at(0).simulate('change', {
      target: { name, value },
    });
    expect(wrapper.state(name)).toBe(value);
  });

  test('should call the submit props', () => {
    const { request } = mockData;
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.setState(request);
    const instance = wrapper.instance();
    instance.onSubmit(event);
    expect(wrapper).toMatchSnapshot();
  });

  test('should call the submit props', () => {
    const { request } = mockData;
    const data = {
      ...request,
      title: '',
      description: '',
    };
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.setState(data);
    const instance = wrapper.instance();
    instance.onSubmit(event);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render connected component', () => {
    wrapper = shallow(<ConnectedRequestForm store={store} {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
