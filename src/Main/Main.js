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
      loading: true
    }

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleClick() {
    browserHistory.push('dashboard');
  }

  handleLogout() {
    request.delete('/api/token').then(() => {
      window.location.href = '/';
    }).catch((err) => console.log(err));
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
              <NavItem href="/dashboard" onClick={this.handleClick}>Dashboard</NavItem>
              <NavItem href="/logout" onClick={this.handleLogout}>Logout</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        { React.cloneElement(this.props.children, {tasks, sessions, user, loading }) }
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
