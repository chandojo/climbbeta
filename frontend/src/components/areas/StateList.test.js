import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import StateList from './StateList.js';

afterEach(cleanup)

test('renders Div content', () => {
  const { getByTestId } = render(
    <StateList />
  )
  expect(getByTestId('loadingDiv')).toHaveTextContent('Loading...')
});
