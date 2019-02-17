import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from './layout/Header.js';
import ClimbingVideos from './videos/ClimbingVideos.js';
import StateDetails from './areas/StateDetails.js';

class App extends Component {
  render(){
    return (
      <div className="container bg-light">
        <h1 className="display-3 text-center">Climb Beta</h1>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path="/react/climbingvideos" component={ClimbingVideos} />
          </Switch>
        </BrowserRouter>

        <StateDetails />
      </div>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
