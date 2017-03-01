import React, {Component} from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import request from 'axios'

// 'wrapper' route to pass down state data. Called by App

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      tasks: [],
      sessions: [],
      loading: true,
      updating: false
    }

    this.handleLogout = this.handleLogout.bind(this);
    this.refreshTasks = this.refreshTasks.bind(this);
    this.refreshSessions = this.refreshSessions.bind(this);
  }

  handleClick(str) {
    browserHistory.push(str);
  }

  handleLogout() {
    request.delete('/api/token').then(() => {
      window.location.href = '/';
    }).catch((err) => console.log(err));
  }

  refreshTasks() {
    this.setState({updating: true})
    request.get('/api/tasks').then(({data}) => this.setState({tasks: data, updating: false }))
  }

  refreshSessions() {
    this.setState({updating: true})
    request.get('/api/sessions').then(({data}) => this.setState({sessions: data, updating: false }))
  }

  render() {
    const { tasks, sessions, user, loading } = this.state

    return (
      <div>
        <Navbar collapseOnSelect staticTop>
          <Navbar.Header>
            <Navbar.Brand>
              APP TITLE GOES HERE
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Text>Welcome, {user.name}</Navbar.Text>
            <Nav bsStyle="pills">
              <NavItem href="/dashboard" onClick={() => this.handleClick('dashboard')}>Dashboard</NavItem>
              <NavItem href="/new-session" onClick={() => this.handleClick('new-session')}>New session</NavItem>
              <NavItem href="/logout" onClick={this.handleLogout}>Logout</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        { React.cloneElement(this.props.children, {
          tasks,
          sessions,
          user,
          loading,
          refreshTasks: this.refreshTasks,
          refreshSessions: this.refreshSessions
        }) }
      </div>
    )
  }

  componentDidMount() {
    Promise.all([
      request.get('/api/user'),
      request.get('/api/tasks'),
      request.get('/api/sessions')
    ]).then(([user, tasks, sessions]) => {
      this.setState({
        user: user.data,
        tasks: tasks.data,
        sessions: sessions.data,
        loading: false
      })
    })
  }
}

export default Main
