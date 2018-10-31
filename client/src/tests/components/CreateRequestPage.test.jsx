import React from 'react';
import { shallow } from 'enzyme';
import { CreateRequestPage } from '../../components/CreateRequestPage';
import mockData from '../__mocks__/mockData';

let wrapper;
let props;
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

  test('should handle onSubmit', () => {
    const { request } = mockData;
    wrapper.find('RequestForm').prop('onSubmit')(request);
    expect(props.startCreateRequest).toHaveBeenCalledWith(request, props.history);
  });
});
