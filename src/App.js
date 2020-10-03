import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './components/Login';
import LandingPage from './components/LandingPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/Login" component={Login} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
