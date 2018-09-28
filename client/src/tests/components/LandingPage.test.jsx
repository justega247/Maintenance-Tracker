import React from 'react';
import { shallow } from 'enzyme';
import LandingPage from '../../components/LandingPage';

describe('Landing Page', () => {
  test('should correctly render LandingPage', () => {
    const wrapper = shallow(<LandingPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
