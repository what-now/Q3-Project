import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import moment from 'moment'

export default function Completed({ tasks }) {
  return <div>
    <h4>Completed tasks</h4>
    <ListGroup>
      {tasks.map(obj => <ListGroupItem key={obj.id}>
        <div>
          <span className="text-left h4">{obj.title}</span><br/>
          <span className="text-right">{moment(obj.completed_at).calendar()}</span>
        </div>
        </ListGroupItem>
      )}
    </ListGroup>
  </div>
}
