import React, { Component } from 'react';

export class Header extends Component {
  render(){
    return (
      <nav class="navbar navbar-expand-md navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
            <div class="navbar-nav mx-auto">
              <a class="nav-link nav-item" href="#">Areas</a>
              <a class="nav-link nav-item" href="#">Members</a>
            </div>
        </div>
      </nav>
    );
  }
}

export default Header;
