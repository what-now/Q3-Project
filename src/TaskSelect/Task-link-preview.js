import React, {Component} from 'react'
import { Modal, Button, Thumbnail } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import scraper from 'metascraper'

export default class TaskPreview extends Component {
  constructor(props) {
    super(props)
    this.state = { data: [] }
  }

  render() {
    return <Modal show={true}>
      <Modal.Header>
        <Modal.Title>Link Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
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
    const scrapePromises = this.props.links.map(url => scraper.scrapeUrl(url))
    Promise.all(scrapePromises).then(data => {
      console.log(data);
      this.setState({ data })
    })
  }
}
