import React, {Component} from 'react'
import { Modal, Pager, Button, Alert } from 'react-bootstrap'
import TaskDisplay from './Task-display'
import { browserHistory } from 'react-router'
import request from 'axios'
import TaskPreview from './Task-link-preview'

// Modals as result of user input. called by time-input

class TaskModal extends Component {
  constructor(props) {
    super(props)
    this.state = { links: null }

    this.postSession = this.postSession.bind(this)
  }

  postSession() {
    const taskToPost = this.props.tasks[this.props.index]
    const id = taskToPost.id

    const duration = taskToPost.required_time - taskToPost.total_time > this.props.time ? this.props.time : taskToPost.required_time - taskToPost.total_time

    const links = taskToPost.description.match(/https?:\/\/.+\S/g)
    this.setState({ links })

    request.post('/api/sessions', { task_id: id, duration, finished: false }).then((res) => {
      if (!links) {
        this.props.reset();
        this.props.refreshTasks();
        browserHistory.push('dashboard');
      }
    });
  }

  del() {

  }

  render() {
    const { tasks, time, reset, index, refreshTasks, changeIndex, del } = this.props
    const { links } = this.state

    return <div>
      {
        tasks.length
        ? <Modal show={tasks.length > 0}>
          <Modal.Header>
            <Modal.Title>Please select your task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TaskDisplay task={tasks[index]} time={time} del={del} refreshTasks={refreshTasks}/>
          </Modal.Body>
          <Modal.Footer>
            <Pager>
              <Pager.Item previous disabled={index === 0} onClick={() => changeIndex(-1)}>Previous</Pager.Item>
              <Button bsStyle="default" onClick={() => reset()}>Reset</Button>
              <Button bsStyle="primary" onClick={() => this.postSession()}>Select</Button>
              <Pager.Item next disabled={index === tasks.length - 1} onClick={() => changeIndex(1)}>Next</Pager.Item>
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
      {
        this.state.links ? <TaskPreview reset={reset} links={links}/> : null
      }
    </div>
  }


}

export default TaskModal
