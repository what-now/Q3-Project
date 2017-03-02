import React, {Component} from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import moment from 'moment'

class Sessions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSessions: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentSessions: nextProps.sessions
    })
  }

  render() {
    return (
      <div>
        <h4>Sessions in Progress</h4>
        <ListGroup>
          {this.state.currentSessions.map(obj => <ListGroupItem key={obj.id}>
            <div>
              <span className="text-left h4">{obj.title}</span><br/>
              {/* <span className="text-right">{moment(obj.completed_at).calendar()}</span> */}
            </div>
            </ListGroupItem>
          )}
        </ListGroup>
      </div>
    )
  }
}

export default Sessions;
// export default function Sessions({ refreshTasks, currentSessions }) {
//   return (
//     <div>
//       <h4>Sessions in Progress</h4>
//       <ListGroup>
//         {currentSessions.map(obj => <ListGroupItem key={obj.id}>
//           <div>
//             <span className="text-left h4">{obj.title}</span><br/>
//             {/* <span className="text-right">{moment(obj.completed_at).calendar()}</span> */}
//           </div>
//           </ListGroupItem>
//         )}
//       </ListGroup>
//     </div>
//   )
// }
