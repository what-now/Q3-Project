import React, {Component} from 'react'
import { Modal, Pager, Button } from 'react-bootstrap'
import TaskDisplay from './Task-display'

// Modals as result of user input. called by time-input

class TaskModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      index: 0
    }

    this.changeIndex = this.changeIndex.bind(this)
  }

  changeIndex(increment) {
    this.setState({ index: this.state.index + increment })
  }

  render() {
    const { tasks, time } = this.props
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
              <Button bsStyle="default">Reset</Button>
              <Button bsStyle="primary">Select</Button>
              <Pager.Item next disabled={index === tasks.length - 1} onClick={() => this.changeIndex(1)}>Next</Pager.Item>
            </Pager>
          </Modal.Footer>
        </Modal>
        : <Modal show={tasks.length === 0}>
          <Modal.Header>
            <Modal.Title>No tasks available</Modal.Title>
          </Modal.Header>
          <Modal.Body>Could not retrieve tasks that match your current settings. Please add more tasks or change your settings.</Modal.Body>
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
