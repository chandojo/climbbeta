import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from './layout/Header.js';
import ClimbingVideos from './videos/ClimbingVideos.js';
import StateList from './areas/StateList.js';
import StateDetail from './areas/StateDetail.js';

class App extends Component {
  render(){
    return (
      <div className="container">
        <h1 className="display-3 text-center">Climb Beta</h1>

        <BrowserRouter>
          <Fragment>
            <Header />

            <Switch>
              <Route exact path="/react" component={StateList} />
              <Route exact path="/react/:id" component={StateDetail} />
              <Route exact path="/react/climbingvideos" component={ClimbingVideos} />
            </Switch>
          </Fragment>
        </BrowserRouter>
      </div>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
