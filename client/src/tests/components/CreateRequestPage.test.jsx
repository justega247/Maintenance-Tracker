import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedRequestPage, { CreateRequestPage } from '../../components/CreateRequestPage';

let wrapper;
let props;

const createMockStore = configureMockStore([thunk]);
const store = createMockStore({});

describe('CreateRequestPage', () => {
  beforeEach(() => {
    props = {
      startCreateRequest: jest.fn(),
      history: { push: jest.fn() },
    };
    wrapper = shallow(<CreateRequestPage {...props} />);
  });

  test('should render CreateRequestPage correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should call startCreateRequest onSubmit', () => {
    const instance = wrapper.instance();
    instance.onSubmit();
    expect(props.startCreateRequest).toHaveBeenCalled();
  });

  test('should render connected component', () => {
    wrapper = shallow(<ConnectedRequestPage store={store} {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
