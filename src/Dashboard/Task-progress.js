import React from 'react'
import {ListGroupItem, ProgressBar} from 'react-bootstrap'

export default function TaskProgress({ task }) {
  return (
    <ListGroupItem header={`${task.title} • ${task.total_time}min/${task.required_time}min`}>
      {task.description}
      <ProgressBar now={task.total_time / task.required_time * 100}/>
    </ListGroupItem>
  )
}
