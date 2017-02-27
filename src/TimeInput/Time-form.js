import React, {Component} from 'react'
import { FormControl, FormGroup, InputGroup, ControlLabel, Button, ButtonGroup } from 'react-bootstrap'
import './Timeform.css'

// form inside the input page, called by time-input

class TimeForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      time: 0,
      location: ''
    }
    this.handleButtons = this.handleButtons.bind(this)
    this.recalculateTime = this.recalculateTime.bind(this)
  }

  recalculateTime() {
    const hours = document.getElementById('hours').value
    const minutes = document.getElementById('minutes').value

    const time = hours * 60 + minutes
    this.setState({ time })
  }

  handleButtons({ target }) {
    this.setState({ location: target.value })
  }

  render() {
    const { submit } = this.props
    return <form onSubmit={() => submit(this.state)}>
      <FormGroup onChange={this.recalculateTime}>
        <InputGroup bsSize="large" className="TimeForm-input">
          <FormControl type="number" id="hours"/>
          <InputGroup.Addon>hrs.</InputGroup.Addon>
          <FormControl type="number" id="minutes"/>
          <InputGroup.Addon>min.</InputGroup.Addon>
        </InputGroup>
      </FormGroup>
      <ControlLabel>Where are you?</ControlLabel>
      <FormGroup className="TimeForm-input">
        <ButtonGroup justified bsSize="large">
          <ButtonGroup>
            <Button value="home" active={this.state.location === 'home'} onClick={this.handleButtons}>Home</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button value="work" active={this.state.location === 'work'} onClick={this.handleButtons}>Work</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button value="anywhere" active={this.state.location === 'anywhere'} onClick={this.handleButtons}>Other</Button>
          </ButtonGroup>
        </ButtonGroup>
      </FormGroup>
      <Button itemType block bsSize="large" bsStyle="primary">Submit</Button>
    </form>
  }
}

export default TimeForm
