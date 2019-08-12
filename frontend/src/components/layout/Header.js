import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import vplusbeta from '../../imgs/vplusbeta.png';
import '../design/header.css';

export default class Header extends Component {
  render(){
    return (
      <div id="header" className="text-secondary" data-testid="headerDiv">
        <div className="row pb-1 mb-1 border-bottom">
          <div className="col-6">
              <Link to="/"><img className="d-inline-flex p-1" src={vplusbeta} width="100px" alt="brand-logo"/></Link>
              <span className="d-inline-flex p-1 text-muted subheader align-bottom">Videos for your climbing projects</span>
          </div>
          <div className="col-6 justify-content-end">
            <nav className="navbar navbar-expand-sm navbar-light main-nav">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div id="navbarToggler" className="collapse navbar-collapse">
                  <ul className="navbar-nav mr-auto mt-2 mt-lg-0 align-bottom">
                     <li className="nav-item">
                         <Link to="/" className="nav-link"><span className="main-link"> Home </span></Link>
                     </li>
                     <li className="nav-item">
                         <Link to="/about" className="nav-link"> <span className="main-link"> About </span></Link>
                     </li>
                     <li className="nav-item">
                         <Link to="/contribute" className="nav-link"> <span className="main-link"> Contribute </span></Link>
                     </li>
                   </ul>
                </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}
