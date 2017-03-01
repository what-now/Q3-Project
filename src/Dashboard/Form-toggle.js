import React, {Component} from 'react'
import {Button, Modal} from 'react-bootstrap'
import NewTaskForm from './Task-form'
import request from 'axios'

// Modal for form + Button that calls the form. Called by dashboard.

class FormToggle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // formVisible: false,
      task:{
        title:'',
        description:'',
        required_time: 0,
        location: '',
        priority: 1,
        dividable: true
      }
    }
    // this.toggleForm = this.toggleForm.bind(this)
    this.submitTask = this.submitTask.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.recalculateTime = this.recalculateTime.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
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

  // toggleForm() {
  //   this.setState({ formVisible: !this.state.formVisible })
  // }

  submitTask() {
    this.props.toggleTaskModal
    request.post('/api/tasks', this.state.task).then(res => {
      this.setState({
        // formVisible: false,
        task:{
          title:'',
          description:'',
          estimated_time: 0,
          location: '',
          priority: 1
        }
      })
      this.props.refreshTasks();
    })
  }

  render() {
    return (
      <div>
        {/* <Button bsStyle="primary" onClick={this.toggleForm}>Add new task</Button> */}
        <Modal show={this.props.formVisible} onHide={this.props.toggleTaskModal}>
          <Modal.Header>
            <Modal.Title>New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewTaskForm submit={this.submitTask} change={this.handleChange} setTime={this.recalculateTime} task={this.state.task} checkbox={this.handleCheckbox}/>
          </Modal.Body>
        </Modal>
      </div>
    )
  }

}

export default FormToggle
