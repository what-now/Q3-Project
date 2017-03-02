import React from 'react'
import {Button, Col, ProgressBar, Row} from 'react-bootstrap'
import './Task-Display.css'
import request from 'axios'
import AutoLinkText from 'react-autolink-text'

// component for each task item, mapped. called by progress & task-modal

export default function TaskDisplay({ task, time, refreshTasks, del, sessions, toggleTaskModal }) {
  const remaining = task.required_time - task.total_time;
  const render = remaining > (time || 0) ? (time || 0) : remaining;

  const deleteTask = function() {
    if (del) {
      del(task.id)
    }
    request.delete(`/api/tasks/${task.id}`).then(() => {
      refreshTasks();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const styleActive = function() {
    if (task.sessions.length) {
      return "taskProgressDiv"
    }
  }

  return (
    <div className={styleActive()}>
      <Row className="show-grid">
        <Col xs={8}>
          <h4>{task.title} • {task.total_time}min/{task.required_time}min</h4>
        </Col>
        <Col xs={4} className="buttonDiv">
          <Button bsStyle="primary" bsSize="small" onClick={() => toggleTaskModal(task)}>Edit</Button>
          <Button bsStyle="primary" bsSize="small" onClick={ deleteTask}>Delete</Button>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <AutoLinkText text={task.description} />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ProgressBar>
            <ProgressBar now={task.total_time / task.required_time * 100} />
            <ProgressBar active now={render / task.required_time * 100}/>
          </ProgressBar>
          <p>Estimated remaining: {remaining}min.</p>
        </Col>
      </Row>
    </div>
  )
}
