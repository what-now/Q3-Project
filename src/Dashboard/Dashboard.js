import React, {Component} from 'react'
import {PageHeader} from 'react-bootstrap'
import Progress from './Progress'
import FormToggle from  './Form-toggle'

// main component for Dashboard. Called by Main.

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return <div className="container-fluid">
      <PageHeader>Dashboard <small>{this.props.user.email}</small></PageHeader>
      {/* {
        this.state.current
        ? <OnGoing sessions={this.state.current} />
        : null
      } */}
      {
        this.props.tasks.length
        ? <div>
          <h4>Progress</h4>
          <Progress tasks={this.props.tasks}/>
        </div>
        : <p className="text-center h4">No tasks saved. Please add new tasks.</p>
      }
      <FormToggle/>
    </div>
  }

}

export default Dashboard
