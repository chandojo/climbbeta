import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

import '../design/footer.css';

const Footer = () => (
    <div className="navbar footer fixed-bottom text-center mx-auto justify-content-end">
      <ul className="list-group list-group-horizontal">
        <li className="list-group-item border-0 p-2">
          <Link to='/about'>
            <span className="text-muted">About</span>
          </Link>
        </li>
        <li className="list-group-item border-0 p-2">
          <Link to='/contribute'>
            <span className="text-muted">Contribute</span>
          </Link>
        </li>
      </ul>
    </div>

);

export default Footer;
