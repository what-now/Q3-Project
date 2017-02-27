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
    return React.cloneElement(this.props.children, {})
  }

  componentDidMount() {
    request.get('/api/tasks').then(({data}) => {
      console.log(data);
      this.setState({ tasks: data })
    })
    request.get('/api/sessions').then(({data}) => {
      console.log(data);
      this.setState({ sessions: data })
    })
  }
}

export default Main
