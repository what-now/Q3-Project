import React, {Component} from 'react'
import {PageHeader, Alert} from 'react-bootstrap'
import Progress from './Progress'
// import FormToggle from  './Form-toggle'
import Completed from './Completed'

// main component for Dashboard. Called by Main.

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    const { user, tasks, refreshTasks } = this.props;
    return <div className="container-fluid">
      <PageHeader>Dashboard <small>{user.email}</small></PageHeader>
      {/* {
        this.state.current
        ? <OnGoing sessions={this.state.current} />
        : null
      } */}
      {
        tasks.length
        ? <div>
          <h4>Progress</h4>
          <Progress tasks={tasks} refreshTasks={refreshTasks}/>
        </div>
        : <Alert bsStyle="info">No tasks saved. Please add new tasks.</Alert>
      }
      {
        <Completed tasks={this.props.tasks.filter(obj => obj.completed_at)}/>
      }
    </div>
  }

}

export default Dashboard
