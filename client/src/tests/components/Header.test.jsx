import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

let wrapper;

describe('Header', () => {
  beforeEach(() => {
    const props = {
      auth: false,
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
});
