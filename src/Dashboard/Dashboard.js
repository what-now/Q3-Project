import React, {Component} from 'react'
import {PageHeader, Alert, Row, Col, Button} from 'react-bootstrap'
import Progress from './Progress'
import FormToggle from  './Form-toggle'
import Completed from './Completed'
import request from 'axios'

// main component for Dashboard. Called by Main.

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalVisible: false,
      task: {
        title:'',
        description:'',
        required_time: 0,
        location: '',
        priority: 1,
        dividable: true
      }
    }
    this.toggleTaskModal = this.toggleTaskModal.bind(this)
    this.submitTask = this.submitTask.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.recalculateTime = this.recalculateTime.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
  }

  toggleTaskModal(taskObj) {
    let isEmpty = true;
    for(const prop in taskObj) {
      if (taskObj.hasOwnProperty(prop)) {
        isEmpty = false;
      }
    }

    if (isEmpty) {
      this.setState({
        modalVisible: !this.state.modalVisible,
        task: {
          title:'',
          description:'',
          required_time: 0,
          location: '',
          priority: 1,
          dividable: true
        }
      });
    } else {
      const { title, description, required_time, location, priority, dividable } = taskObj;
      this.setState({
        modalVisible: !this.state.modalVisible,
        task: { title, description, required_time, location, priority, dividable }
      });
    }
  }

  recalculateTime(hrs, min) {
    const value = +hrs * 60 + +min

    this.handleChange({target: { value }}, 'required_time')
  }

  handleCheckbox(event, field) {
    const task = {...this.state.task, [field]: event.target.checked}
    this.setState({ task })
  }

  handleChange(event, field) {
    const task = {...this.state.task, [field]: event.target.value}
    this.setState({ task })
  }

  submitTask() {
    request.post('/api/tasks', this.state.task).then(res => {
      this.setState({
        // modalVisible: false,
        task:{
          title:'',
          description:'',
          estimated_time: 0,
          location: '',
          priority: 1
        }
      })
      this.toggleTaskModal();
      this.props.refreshTasks();
    })
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
          <Progress tasks={tasks} refreshTasks={refreshTasks} sessions={sessions} toggleTaskModal={this.toggleTaskModal}/>
        </div>
        : <Row>
          <Col xs={12}>
            <Alert bsStyle="info">No tasks saved. Please add new tasks.</Alert>
          </Col>
        </Row>
      }
      { <Button bsStyle="primary" onClick={() => this.toggleTaskModal({})}>Add new task</Button> }
      { <FormToggle
          refreshTasks={refreshTasks}
          modalVisible={this.state.modalVisible} toggleTaskModal={this.toggleTaskModal} recalculateTime={this.recalculateTime}
          handleChange={this.handleChange}
          handleCheckbox={this.handleCheckbox}
          task={this.state.task}
          submitTask={this.submitTask}
        />
      }
      { <Completed tasks={this.props.tasks.filter(obj => obj.completed_at)} /> }
    </div>
  }
}

export default Dashboard
