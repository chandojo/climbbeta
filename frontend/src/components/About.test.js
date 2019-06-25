import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';

import About from './About.js';

afterEach(cleanup);

it('renders about section paragraphs', ()=>{
  const { getByTestId } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>);
  expect(getByTestId('aboutSection')).toHaveTextContent('Climb Beta is an opensource project built by climbers for climbers. It\'s beginnings started with the need to conveniently watch climbing videos across platforms and now strives to be a "one stop shop" for climbers when it comes to the crag.Originally, we were built by one climber. Now we are looking for more climbers who are stoked to contribute to the cause. Please visit our Contribute page to see how you can help.')
});
