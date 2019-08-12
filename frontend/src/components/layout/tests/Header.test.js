import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import Header from '../Header.js';
import { MemoryRouter } from 'react-router-dom';


afterEach(cleanup)

test('header renders', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  expect(getByTestId('headerDiv')).toHaveTextContent("Videos for your climbing projects");
});
