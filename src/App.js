import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import { MasterDetail } from './components';
import { MasterContainer, DetailContainer } from './containers';

import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={Login} />
            <Route path="/courselist"
              render={props => (
                <MasterDetail MasterType={MasterContainer} masterProps={{}}
                  DetailType={DetailContainer} detailProps={{}} />
              )} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
