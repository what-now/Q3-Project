import React from 'react'
import {Button, Col, ProgressBar, Row} from 'react-bootstrap'
import './Task-Display.css'
import request from 'axios'

// component for each task item, mapped. called by progress & task-modal

export default function TaskDisplay({ task, time, refreshTasks, del }) {
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

  const editTask = function() {
    alert('testing');
  }

  const styleActive = function() {
    if (task.sessions.length) {
      return "taskProgressDiv"
    }
  }

  const findUrls = function() {
    const regEx = /(?:https?\:\/\/|www\.)(?:[-a-z0-9]+\.)*[-a-z0-9]+.*/g
    let description = task.description
    const urls = description.match(regEx)
    let newString = ''
    if (urls) {
      for (const url of urls) {
        newString = description.replace(url, `<a href="${url}" target="_blank">${url}</a>`)
        description = newString;
      }
    }
    return newString;
  }

  return (
    <div className={styleActive()}>
      <Row className="show-grid">
        <Col xs={8}>
          <h4>{task.title} • {task.total_time}min/{task.required_time}min</h4>
        </Col>
        <Col xs={4} className="buttonDiv">
          <Button bsStyle="primary" bsSize="small" onClick={() => editTask()}>Edit</Button>
          <Button bsStyle="primary" bsSize="small" onClick={ deleteTask}>Delete</Button>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          {/* <p>this is a string <a href="https://www.w3schools.com" target="_blank">Visit W3Schools.com!</a></p> */}
          <p>{findUrls()}</p>
          {/* <p>{task.description}</p> */}
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
