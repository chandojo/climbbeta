import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';
import ClimbingVideos from './videos/ClimbingVideos.js';
import StateList from './areas/StateList.js';
import StateDetail from './areas/StateDetail.js';
import CityDetail from './areas/CityDetail.js';
import PageError from './PageError.js';
import About from './About.js';
import Contribute from './Contribute.js';
import SideNav from './layout/SideNav.js';
import RandomVideo from './videos/RandomVideo.js';

class App extends Component {
  render(){
    return (
      <div className="container">
        <BrowserRouter>
          <Fragment>
            <Header />
            <div className="row">
              <div className="col-2 p-3">
                <SideNav />
              </div>
              <div className="col-10">
            <Switch>
  {/*            <Route exact path="/climbingvideos" component={ClimbingVideos} /> */}
              <Route exact path="/randomvideo" component={RandomVideo} />
              <Route exact path="/" component={StateList} />
              <Route exact path="/about" component={About} />
              <Route exact path="/contribute" component={Contribute} />
              <Route path="/:id" component={StateDetail} />
              <Route component={PageError}/>
            </Switch>
          </div>

          </div>
            <Footer/>

          </Fragment>
        </BrowserRouter>

      </div>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
