import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import TaskProgress from '../TaskSelect/Task-display'

// wrapper for progress list group. Called by dashboard conditionally if tasks.length > 0

export default function Progress({ tasks, refreshTasks }) {
  return (
    <ListGroup>
      {tasks.map(obj => <ListGroupItem key={obj.id}>
        <TaskProgress task={obj} refreshTasks={refreshTasks}/>
      </ListGroupItem>)}
    </ListGroup>
  )
}
