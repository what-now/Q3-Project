import React from 'react'
import {ProgressBar} from 'react-bootstrap'

export default function TaskProgress({ task }) {
  return (
    <div className="taskProgress">
      <h5>{`${task.title} • ${task.total_time}min/${task.required_time}min`}</h5>
      <p>{task.description}</p>
      <ProgressBar now={task.total_time / task.required_time * 100} />
    </div>
  )
}
