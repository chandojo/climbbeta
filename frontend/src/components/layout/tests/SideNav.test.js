import 'babel-polyfill';
import React from 'react';
import { cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { shallow, mount, configure, render } from 'enzyme';
import SideNav from '../SideNav.js';
import Adapter from 'enzyme-adapter-react-16';
import { fetchAPI } from '../../areas/fetchAPI.js';
import { MemoryRouter, Link } from 'react-router-dom'

configure({ adapter: new Adapter() });
jest.mock('../../areas/fetchAPI');

afterEach(cleanup)

test('sideNav should exist', async () => {
  const wrapper = await shallow(
      <SideNav />
  )
  expect(wrapper.find('#sideNav')).toHaveLength(1);
});

test('one random-vid should exist', async () => {
  const wrapper = await mount(
    <MemoryRouter>
      <SideNav />
    </MemoryRouter>
  );
  expect(wrapper.find('.random-vid')).toHaveLength(1);
});

test('one Link should exist', async () => {
  const wrapper = await mount(
    <MemoryRouter>
      <SideNav />
    </MemoryRouter>
  );
  wrapper.update()
  expect(wrapper.find(Link)).toHaveLength(1);
});

test('loaded SideNav should return values', async () => {
  let wrapper = await shallow(
    <SideNav/>
  );
  let expectedValues = {
        "id": 1,
        "name": "Washington",
        "cities": [
            "Gold Bar",
            "Index"
        ],
        "abbrv": "WA",
        "slug": "washington",
        "img": "http://127.0.0.1:8000/media/areas/media/Index_aL4Eq1v.jpg"
    };
    expect(wrapper.state('stateList')).toEqual(expect.objectContaining(expectedValues));
});
