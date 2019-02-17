import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Header from './layout/Header.js';
import ClimbingVideos from './videos/ClimbingVideos.js';
class App extends Component {
  render(){
    return (
      <div class="container bg-light">
        <h1 class="display-3 text-center">Climb Beta</h1>
        <Header />
        <ClimbingVideos />
      </div>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
