import React, {Component} from 'react'
import {PageHeader, Alert, Row, Col, Button} from 'react-bootstrap'
import Progress from './Progress'
import FormToggle from  './Form-toggle'
import Completed from './Completed'

// main component for Dashboard. Called by Main.

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      formVisible: false
    }

    this.toggleTaskModal = this.toggleTaskModal.bind(this)
  }

  toggleTaskModal(taskObj) {
    console.log(taskObj);
    this.setState({ formVisible: !this.state.formVisible })
  }

  render() {
    const { user, tasks, refreshTasks, sessions } = this.props;
    return <div className="container-fluid">
      <PageHeader>Dashboard <small>{user.email}</small></PageHeader>
      <FormToggle refreshTasks={refreshTasks}/>
      {/* {
        this.state.current
        ? <OnGoing sessions={this.state.current} />
        : null
      } */}
      {
        tasks.length
        ? <div>
          <h4>Progress</h4>
          <Progress tasks={tasks} refreshTasks={refreshTasks} sessions={sessions}/>
        </div>
        : <Row>
          <Col xs={12}>
            <Alert bsStyle="info">No tasks saved. Please add new tasks.</Alert>
          </Col>
        </Row>
      }
      { <Button bsStyle="primary" onClick={() => this.toggleTaskModal({})}>Add new task</Button> }
      { <FormToggle refreshTasks={refreshTasks} formVisible={this.state.formVisible} toggleTaskModal={this.toggleTaskModal} /> }
      { <Completed tasks={this.props.tasks.filter(obj => obj.completed_at)} /> }
    </div>
  }

}

export default Dashboard
