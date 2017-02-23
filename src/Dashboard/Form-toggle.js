import React, {Component} from 'react'
import {Button, Modal} from 'react-bootstrap'
import NewTaskForm from './Task-form'

class FormToggle extends Component {
  constructor(props) {
    super(props)
    this.state = { formVisible: false }
    this.toggleForm = this.toggleForm.bind(this)
    this.submitTask = this.submitTask.bind(this)
  }

  toggleForm() {
    this.setState({ formVisible: !this.state.formVisible })
  }

  submitTask(task) {
    this.setState({ formVisible: false })
  }

  render() {
    return <div>
      <Button bsStyle="primary" onClick={this.toggleForm}>Add new task</Button>
      <Modal show={this.state.formVisible} onHide={this.toggleForm}>
        <NewTaskForm submit={this.submitTask}/>
      </Modal>
    </div>
  }

}

export default FormToggle
