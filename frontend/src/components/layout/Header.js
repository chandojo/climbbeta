import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

class Header extends Component {
  render(){
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mt-3">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">Climb Beta</Link>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item">
                  <Link to="/climbingvideos" className="nav-link"> Climbing Videos </Link>
              </li>
            </ul>

          </div>
        </nav>

    );
  }
}

export default Header;
