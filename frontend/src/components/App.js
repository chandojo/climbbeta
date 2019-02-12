import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Header from './layout/Header';


class App extends Component {
  render(){
    return (
      <>
      <h1 className="text-center">Climb Beta</h1>
      <Header />
      </>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
