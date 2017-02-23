import React, { Component } from 'react';
import { Router, Route } from 'react-router'
import { Navbar, Nav } from 'react-bootstrap'
import './App.css';
import Dashboard from './Dashboard/Dashboard'

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

      {/* <Router>
        <Route />
      </Router> */}

      <Dashboard />

    </div>
  }
}

export default App;
