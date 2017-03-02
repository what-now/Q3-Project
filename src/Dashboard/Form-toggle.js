import React, {Component} from 'react'
import {Button, Modal} from 'react-bootstrap'
import NewTaskForm from './Task-form'
import request from 'axios'

// Modal for form + Button that calls the form. Called by dashboard.

class FormToggle extends Component {

  render() {
    return (
      <div>
        <Modal show={this.props.modalVisible} onHide={this.props.toggleTaskModal}>
          <Modal.Header>
            <Modal.Title>New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewTaskForm
              submit={this.props.submitTask}
              change={this.props.handleChange} setTime={this.props.recalculateTime}
              task={this.props.task}
              checkbox={this.props.handleCheckbox}/>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default FormToggle
