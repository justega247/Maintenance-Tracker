import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../components/common/Button';

let wrapper;

describe('Button', () => {
  beforeEach(() => {
    const props = {
      text: 'search',
      type: 'button',
      className: 'big',
    };
    wrapper = shallow(<Button {...props} />);
  });

  test('should correctly render Button', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
