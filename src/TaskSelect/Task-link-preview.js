import React, {Component} from 'react'
import { Modal, Button, Thumbnail } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import request from 'axios'

export default class TaskPreview extends Component {
  constructor(props) {
    super(props)
    this.state = { data: [], error: null }
  }

  render() {
    return <Modal show={true}>
      <Modal.Header>
        <Modal.Title>Link Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          this.state.error
          ? <h5>Error loading preview</h5>
          :
          this.state.data.length
          ? this.state.data.map((obj, index) => <a href={obj.url} target="_blank" key={index}>
            <Thumbnail src={obj.image}>
              <h3>{obj.title}</h3>
              <h5>{obj.author}</h5>
              <p>{obj.description}</p>
            </Thumbnail>
          </a>)
          : <h4>Loading...</h4>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {
          this.props.reset()
          browserHistory.push('dashboard')
        }}>To Dashboard</Button>
      </Modal.Footer>
    </Modal>
  }

  componentDidMount() {
    const requestPromises = this.props.links.map(url => request.post(`/api/preview/`, {url}))
    
    Promise.all(requestPromises).then(arr => {
      const data = arr.map(arr => arr.data)
      console.log(data);
      this.setState({ data })
    }).catch(error => {
      console.log(error);
      this.setState({ error })
    })
  }
}
