import React from 'react'
import {ListGroupItem, ProgressBar} from 'react-bootstrap'
import './Task-progress.css'

// component for each task item, mapped. called by progress.

export default function TaskProgress({ task }) {
  return (
    <ListGroupItem>
      <h4>{`${task.title} • ${task.total_time}min/${task.required_time}min`}</h4>
      <p>{task.description}</p>
      <ProgressBar now={task.total_time / task.required_time * 100} />
    </ListGroupItem>
  )
}
