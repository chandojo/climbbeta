import 'babel-polyfill';
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import StateDetail from '../StateDetail.js';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

configure({ adapter: new Adapter() });
jest.mock('../fetchAPI');

afterEach(cleanup)


test('id should match params id', async () => {
  const wrapper = await shallow (
      <StateDetail match={{ params: {id:'1'}}} />
  );
  expect(wrapper.state('id')).toEqual('1');
})

test('state name should be Washington', async () => {
  const wrapper = await shallow (
      <StateDetail match={{ params: {id:'1'}}} />
  );
  expect(wrapper.state('name')).toEqual('Washington');
})

test('cities should include Gold Bar and Index', async () => {
  const wrapper = await shallow (
      <StateDetail match={{ params: {id:'1'}}} />
  );
  expect(wrapper.state('cities')).toEqual(['Gold Bar', 'Index']);
})

test('cities should include Gold Bar and Index', async () => {
  const wrapper = await shallow (
      <StateDetail match={{ params: {id:'1'}}} />
  );
  expect(wrapper.state('cities')).toEqual(['Gold Bar', 'Index']);
})

test('img should be as labelled in mock', async () => {
  const wrapper = await shallow (
      <StateDetail match={{ params: {id:'1'}}} />
  );
  expect(wrapper.state('img')).toEqual('http://127.0.0.1:8000/media/areas/media/Index_aL4Eq1v.jpg');
})

test('h1 should contain Washington', async () => {
  const wrapper = await shallow(
      <StateDetail match={{ params: {id:'1'}}} />
  );
  expect(wrapper.find('h1').text()).toEqual('Washington');
})

test('parent div in map should have class card d-inline-flex bg-light state-card', async () => {
  const wrapper = await shallow(
      <StateDetail match={{ params: {id:'1'}}} />
  );
  expect(wrapper.state('cityClass')).toEqual('card d-inline-flex bg-light state-card')
})
