import React, {Component} from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import request from 'axios'

// 'wrapper' route to pass down state data. Called by App

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      sessions: []
    }

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleClick() {
    browserHistory.push('dashboard');
  }

  handleLogout() {
    request.delete('/api/token').then(() => {
      // this.setState({
      //   tasks: [],
      //   sessions: []
      // });
      window.location.href = '/';
      // browserHistory.push('/');
    }).catch((err) => console.log(err));
  }

  render() {
    const { tasks, sessions } = this.state

    return (
      <div>
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              APP TITLE GOES HERE
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Text>Welcome</Navbar.Text>
            <Nav>
              <NavItem eventKey={1} href="/dashboard" onClick={this.handleClick}>Dashboard</NavItem>
              <NavItem eventKey={2} href="/logout" onClick={this.handleLogout}>Logout</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        { React.cloneElement(this.props.children, {tasks, sessions}) }
      </div>
    )
  }

  componentDidMount() {
    request.get('/api/tasks').then(({data}) => {
      this.setState({ tasks: data })
    })
    request.get('/api/sessions').then(({data}) => {
      this.setState({ sessions: data })
    })
  }
}

export default Main
