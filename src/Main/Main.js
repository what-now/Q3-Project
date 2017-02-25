import React, {Component} from 'react'
import request from 'axios'

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
      
      this.setState({ tasks: data })
    })
  }
}

export default Main
