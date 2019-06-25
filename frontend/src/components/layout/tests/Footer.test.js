import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import Footer from '../Footer.js';
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup)
it('renders footer links', ()=>{
  const { getByTestId } = render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
  expect(getByTestId('footerDiv')).toHaveTextContent('AboutContribute')
});
