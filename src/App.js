import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Navbar, Nav } from 'react-bootstrap'
import './App.css';
import Main from './Main/Main'
import Dashboard from './Dashboard/Dashboard'
import TimeInput from './TimeInput/Time-input'

class App extends Component {
  render() {
    return <div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            APP TITLE GOES HERE
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>

      <Router history={browserHistory}>
        <Route path="/" component={Main}>

          <IndexRoute component={TimeInput}/>
          {/* <Route/> */}
          <Route path="dashboard" component={Dashboard}/>
        </Route>
      </Router>

      {/* <TimeInput /> */}
      {/* <Dashboard /> */}

    </div>
  }
}

export default App;
