import React, {Component} from 'react'
import { Modal, Button } from 'react-bootstrap'
import moment from 'moment'
import request from 'axios'
import AdditionalTime from './Feedback-input'

class FeedbackModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      additionalTime: {
        inputVisible: false,
        time: ''
      }
    }
    this.showInput = this.showInput.bind(this)
    this.updateTime = this.updateTime.bind(this)
    this.feedback = this.feedback.bind(this)
  }

  showInput() {
    this.setState({ additionalTime: { inputVisible: true, time: '' } })
  }

  updateTime(event) {
    this.setState({ additionalTime: { inputVisible: true, time: event.target.value} })
  }

  addTime() {

  }

  complete() {
    const obj = {}

    request.patch(`/api/tasks/${this.props.session.task_id}`, obj)

    this.feedback(true)
  }

  feedback(finished) {
    const obj = {
      feedback: new Date()
    }

    if (finished === true) {
      obj.finished = true
    }

    request.patch(`/api/sessions/${this.props.session.id}`, obj).then(() => this.props.refreshSessions())
  }

  render() {
    const { session } = this.props

    return <Modal show={true}>
      <Modal.Header>
        <Modal.Title>How is "{session.title}" going?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Welcome back!</h5>
        <p>After your {session.duration}-minute session on {moment(session.created_at).calendar()}, what is your overall progress?</p>
        {this.state.additionalTime.inputVisible ? <AdditionalTime updateTime={this.updateTime} time={this.state.additionalTime.time} submit={this.addTime} /> : null}
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="primary" onClick={this.feedback}>On track</Button>
        <Button onClick={this.complete}>Mark as completed</Button>
        <Button disabled={this.state.additionalTime.inputVisible} onClick={this.showInput}>Will need more time</Button>
      </Modal.Footer>
    </Modal>
  }
}

export default FeedbackModal
