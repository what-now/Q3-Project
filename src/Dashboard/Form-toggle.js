import React, {Component} from 'react'
import {Modal} from 'react-bootstrap'
import NewTaskForm from './Task-form'

// Modal for form + Button that calls the form. Called by dashboard.

class FormToggle extends Component {

  render() {
    return (
      <div>
        <Modal show={this.props.modalVisible} onHide={this.props.toggleTaskModal}>
          {/* <Modal.Header closeButton> */}
          <Modal.Header>
            <Modal.Title>{this.props.modalInfo.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewTaskForm
              submit={this.props.submitTask}
              change={this.props.handleChange} setTime={this.props.recalculateTime}
              task={this.props.task}
              checkbox={this.props.handleCheckbox}
              modalInfo={this.props.modalInfo}
            />
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default FormToggle
