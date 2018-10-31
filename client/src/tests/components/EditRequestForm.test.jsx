import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedEditRequest, { EditRequestForm } from '../../components/EditRequestForm';
import mockData from '../__mocks__/mockData';

let wrapper;
let props;

const createMockStore = configureMockStore([thunk]);
const store = createMockStore({});

describe('Edit Request Form', () => {
  beforeEach(() => {
    props = {
      fetchRequest: jest.fn().mockResolvedValue(Promise.resolve()),
      startUpdateRequest: jest.fn(),
      history: {
        push: jest.fn(),
      },
      match: {
        params: {
          id: 2,
        },
      },
    };
    wrapper = shallow(<EditRequestForm {...props} />);
  });

  test('should render EditRequestForm correctly', () => {
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

  test('should call startUpdateRequest with valid submission', () => {
    const { request } = mockData;
    wrapper.setState(request);
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
    });
    expect(props.startUpdateRequest).toHaveBeenCalledWith(2, request, props.history);
  });

  test('should render connected component', () => {
    wrapper = shallow(<ConnectedEditRequest store={store} {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
