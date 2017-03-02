import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import TaskDisplay from '../TaskSelect/Task-display'

// wrapper for progress list group. Called by dashboard conditionally if tasks.length > 0

export default function Progress({ tasks, refreshTasks, sessions, toggleTaskModal }) {
  return (
    <ListGroup>
      {tasks.map(obj => <ListGroupItem key={obj.id} className={obj.sessions.length ? "taskProgressDiv" : ''}>
        <TaskDisplay task={obj} refreshTasks={refreshTasks} sessions={sessions} toggleTaskModal={toggleTaskModal}/>
      </ListGroupItem>)}
    </ListGroup>
  )
}
