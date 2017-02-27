import React from 'react'

// content of task modal. called by task-modal

export default function TaskDisplay({ task }) {
  return <div>
    <h4>{task.title}</h4>
    <p>{task.description}</p>
  </div>
}
