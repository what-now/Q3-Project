import React from 'react'
import {Button, Col, ProgressBar, Row} from 'react-bootstrap'
import './Task-Display.css'
import request from 'axios'

// component for each task item, mapped. called by progress & task-modal

export default function TaskProgress({ task, time, refreshTasks }) {
  const remaining = task.required_time - task.total_time;
  const render = remaining > (time || 0) ? (time || 0) : remaining;

  const deleteTask = function() {
    request.delete(`/api/tasks/${task.id}`).then(() => {
      refreshTasks();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div>
      <Row className="show-grid">
        <Col xs={8}>
          <h4>{task.title} • {task.total_time}min/{task.required_time}min</h4>
        </Col>
        <Col xs={4} className="buttonDiv">
          <Button bsStyle="primary" bsSize="small">Edit</Button>
          <Button bsStyle="primary" bsSize="small" onClick={() => deleteTask()}>Delete</Button>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <p>{task.description}</p>
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
    // <div>
    //   <h4>{task.title} • {task.total_time}min/{task.required_time}min</h4>
    //   <p>{task.description}</p>
    //   <ProgressBar>
    //     <ProgressBar now={task.total_time / task.required_time * 100} />
    //     <ProgressBar active now={render / task.required_time * 100}/>
    //   </ProgressBar>
    //   <p>Estimated remaining: {remaining}min.</p>
    // </div>
  )
}
