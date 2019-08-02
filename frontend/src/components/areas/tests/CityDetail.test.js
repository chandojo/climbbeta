import 'babel-polyfill';
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import CityDetail from '../CityDetail.js';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
jest.mock('../fetchAPI');

afterEach(cleanup)

test('isLoaded properties should be false when no city or id given', async () => {
  let wrapper = await shallow(
    <CityDetail />
  )
  expect(wrapper.state('isCityLoaded')).toEqual(false);
  expect(wrapper.state('isVideoLoaded')).toEqual(false);
  expect(wrapper.state('isWeatherLoaded')).toEqual(false);
});
