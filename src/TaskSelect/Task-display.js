import React from 'react'
import {ProgressBar} from 'react-bootstrap'

// component for each task item, mapped. called by progress & task-modal

export default function TaskProgress({ task, time }) {
  const remaining = task.required_time - task.total_time;
  const render = remaining > (time || 0) ? (time || 0) : remaining;
  return <div>
    <h4>{task.title} • {task.total_time}min/{task.required_time}min</h4>
    <p>{task.description}</p>
    <ProgressBar>
      <ProgressBar now={task.total_time / task.required_time * 100} />
      <ProgressBar active now={render / task.required_time * 100}/>
    </ProgressBar>
    <p>Estimated remaining: {remaining}min.</p>
  </div>
}
