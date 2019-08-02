import 'babel-polyfill';
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { fetchAPI } from '../fetchAPI.js';

configure({ adapter: new Adapter() });
jest.mock('../fetchAPI');

afterEach(cleanup)

test('mocked fetchAPI', () => {
  fetchAPI().then(data => {
    const expectedValues = ["Gold Bar", "Index"]
    expect(data.id).toBe(1);
    expect(data.name).toBe('Washington');
    expect(data.cities).toEqual(expect.arrayContaining(expectedValues));
    expect(data.abbrv).toBe('WA');
    expect(data.slug).toBe('washington');
    expect(data.img).toBe('http://127.0.0.1:8000/media/areas/media/Index_aL4Eq1v.jpg');
  });
});
