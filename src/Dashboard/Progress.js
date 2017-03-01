import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import TaskProgress from '../TaskSelect/Task-display'

// wrapper for progress list group. Called by dashboard conditionally if tasks.length > 0

<<<<<<< HEAD
export default function Progress({ tasks, refreshTasks }) {
  return <ListGroup>
    {tasks.map(obj => <ListGroupItem key={obj.id}>
      <TaskProgress task={obj} refreshTasks={refreshTasks}/>
    </ListGroupItem>)}
  </ListGroup>
=======
export default function Progress({ tasks }) {
  return <div>
    <h4>Progress</h4>
    <ListGroup>
      {tasks.map(obj => <ListGroupItem key={obj.id}>
        <TaskProgress task={obj}/>
      </ListGroupItem>)}
    </ListGroup>
  </div>
>>>>>>> bdc5cfefaf4072902db5bf06e9b27938a9ad2da1
}
