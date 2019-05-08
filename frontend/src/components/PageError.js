import React from 'react';

const PageError = ({ location }) =>(
  <div>
    <p>{ location.pathname } does not exist</p>
    <p>This page does not exist</p>
  </div>
);

export default PageError;
