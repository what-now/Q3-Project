import React, {Component} from 'react'
import { Modal, Pager, Button, Alert } from 'react-bootstrap'
import TaskDisplay from './Task-display'
import { browserHistory } from 'react-router'
import request from 'axios'

// Modals as result of user input. called by time-input

class TaskModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      index: 0
    }

    this.changeIndex = this.changeIndex.bind(this)
    this.postSession = this.postSession.bind(this)
  }

  changeIndex(increment) {
    this.setState({ index: this.state.index + increment })
  }

  postSession() {
    const taskToPost = this.props.tasks[this.state.index]
    const id = taskToPost.id

    const duration = taskToPost.required_time - taskToPost.total_time > this.props.time ? this.props.time : taskToPost.required_time - taskToPost.total_time

    request.post('/api/sessions', { task_id: id, duration, finished: false }).then((res) => {
      this.props.reset();
      this.props.refreshTasks();
      browserHistory.push('dashboard');
    });
  }

  render() {
    const { tasks, time, reset } = this.props
    const { index } = this.state
    return <div>
      {
        tasks.length
        ? <Modal show={tasks.length > 0}>
          <Modal.Header>
            <Modal.Title>Please select your task</Modal.Title>
          </Modal.Header>
          <Modal.Body><TaskDisplay task={tasks[index]} time={time}/></Modal.Body>
          <Modal.Footer>
            <Pager>
              <Pager.Item previous disabled={index === 0} onClick={() => this.changeIndex(-1)}>Previous</Pager.Item>
              <Button bsStyle="default" onClick={() => reset()}>Reset</Button>
              <Button bsStyle="primary" onClick={() => this.postSession()}>Select</Button>
              <Pager.Item next disabled={index === tasks.length - 1} onClick={() => this.changeIndex(1)}>Next</Pager.Item>
            </Pager>
          </Modal.Footer>
        </Modal>
        : <Modal show={tasks.length === 0}>
          <Modal.Header>
            <Modal.Title>No tasks available</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Alert bsStyle="info">
              Could not retrieve tasks that match your current settings. Please add more tasks or change your settings.
            </Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button>Reset</Button>
            <Button>Go to dashboard</Button>
          </Modal.Footer>
        </Modal>
      }
    </div>
  }


}

export default TaskModal
