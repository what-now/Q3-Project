import React from 'react'
import { ListGroup } from 'react-bootstrap'
import TaskProgress from './Task-progress'

export default function Progress({ tasks }) {
  return <ListGroup>
    {tasks.map(obj => <TaskProgress key={obj.id} task={obj}/>)}
  </ListGroup>
}
