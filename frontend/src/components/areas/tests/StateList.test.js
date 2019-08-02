import 'babel-polyfill';
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import StateList from '../StateList.js';
import { shallow, mount, configure } from 'enzyme';
import StateInline from '../StateInline.js';
import Adapter from 'enzyme-adapter-react-16';
import { fetchAPI } from '../fetchAPI.js';

configure({ adapter: new Adapter() });
jest.mock('../fetchAPI');

afterEach(cleanup)

test('renders Div content', () => {
  const { getByTestId } = render(
    <StateList />
  )
  expect(getByTestId('loadingDiv')).toHaveTextContent('Loading...')
});

test('isLoaded should be true', async () => {
  let wrapper = await shallow(
    <StateList />
  )
  expect(wrapper.state('isLoaded')).toEqual(true);
});

test('mocked fetchAPI', () => {
  fetchAPI().then(data => {
    expected(data.id).toBe(1);
    expected(data.name).toBe('Washington');
    expected(data.cities).toBe(['Gold Bar', 'Index']);
    expected(data.abbrv).toBe('WA');
    expected(data.slug).toBe('washington');
    expected(data.img).toBe('http://127.0.0.1:8000/media/areas/media/Index_aL4Eq1v.jpg');
  });
});
