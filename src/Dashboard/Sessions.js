import React, {Component} from 'react'
import { ListGroup, ListGroupItem, Col, Row } from 'react-bootstrap'
import moment from 'moment'
import './Sessions.css'

class Sessions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSessions: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentSessions: nextProps.sessions
    })
  }

  getEndTime(session) {
    const sessionStart = moment(session.created_at);
    const duration = moment.duration({'minutes': session.duration});
    const endTime = moment(sessionStart).add(duration).format("h:mma");
    return endTime;
  }

  render() {
    return (
      <div>
        <h4>Sessions in Progress</h4>
        <ListGroup>
          {this.state.currentSessions.map(obj =>
            <ListGroupItem key={obj.id}>
              <Row>
                <Col xs={7}>
                  <span className="text-left h4">{obj.title}</span><br/>
                </Col>
                <Col xs={5} className="sessionEndTime">
                  <span>Session End Time: {this.getEndTime(obj)}</span>
                </Col>
              </Row>
            </ListGroupItem>
          )}
        </ListGroup>
      </div>
    )
  }
}

export default Sessions;
