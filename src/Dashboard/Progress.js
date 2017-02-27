import React from 'react'
import { ListGroup } from 'react-bootstrap'
import TaskProgress from './Task-progress'

// wrapper for progress list group. Called by dashboard conditionally if tasks.length > 0

export default function Progress({ tasks }) {
  return <ListGroup>
    {tasks.map(obj => <TaskProgress key={obj.id} task={obj}/>)}
  </ListGroup>
}
