import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';

import Contribute from './Contribute.js';

afterEach(cleanup);

it('renders contribute paragraph', ()=>{
  const { getByTestId } = render(
    <Contribute />
  );
  expect(getByTestId('contributeDiv')).toHaveTextContent('Climb Beta is looking for coders and developers of all abilities to contribute to our project. Our goal is to be a resource for climbers planning to go out to the crag or simply looking for project beta. To get there, we have a wishlist of features and performance improvements. These wishes aren\'t limited by any means. If you have ideas on how to make this site more user-friendly, function better, or anything of the like please let us know!')
});
