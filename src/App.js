import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import './App.css';
import Main from './Main/Main'
import Landing from './Main/Landing'
import Dashboard from './Dashboard/Dashboard'
import TimeInput from './TimeInput/Time-input'

export default function App() {
  return <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={Landing} />
        <Route path="new-session" component={TimeInput}/>
        <Route path="dashboard" component={Dashboard}/>
      </Route>
    </Router>
}
