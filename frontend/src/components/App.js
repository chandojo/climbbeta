import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Header from './layout/Header.js';

class App extends Component {
  render(){
    return (
      <div>
        <h1>Hello</h1>
        <Header />
      </div>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
