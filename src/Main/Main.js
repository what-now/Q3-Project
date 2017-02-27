import React, {Component} from 'react'
import request from 'axios'

// 'wrapper' route to pass down state data. Called by App

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      sessions: []
    }
  }

  render() {
    const { tasks, sessions } = this.state
    return React.cloneElement(this.props.children, {tasks, sessions})
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
