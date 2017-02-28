import React, {Component} from 'react'
import { FormControl, FormGroup, InputGroup, ControlLabel, Button, ButtonGroup, Glyphicon } from 'react-bootstrap'
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
    const { hours, minutes } = this.props;
    const time = +hours * 60 + +minutes
    this.setState({ time })
  }

  handleButtons({ target }) {
    this.setState({ location: target.value })
  }

  render() {
    const { submit, handleChange, hours, minutes } = this.props
    return <form onSubmit={(event) => submit(event, this.state)}>
      <FormGroup onChange={this.recalculateTime}>
        <InputGroup bsSize="large" className="TimeForm-input">
          <FormControl
            type="number"
            id="hours"
            name="hours"
            value={hours}
            onChange={handleChange}
          />
          <InputGroup.Addon>hrs.</InputGroup.Addon>
          <FormControl
            type="number"
            id="minutes"
            name="minutes"
            onChange={handleChange}
            value={minutes}
          />
          <InputGroup.Addon>min.</InputGroup.Addon>
        </InputGroup>
      </FormGroup>
      <ControlLabel>Where are you?</ControlLabel>
      <FormGroup className="TimeForm-input">
        <ButtonGroup justified bsSize="large">
          <ButtonGroup>
            <Button value="home" active={this.state.location === 'home'} onClick={this.handleButtons}><Glyphicon glyph="home"/> Home</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button value="work" active={this.state.location === 'work'} onClick={this.handleButtons}><Glyphicon glyph="briefcase"/> Work</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button value="anywhere" active={this.state.location === 'anywhere'} onClick={this.handleButtons}>Other</Button>
          </ButtonGroup>
        </ButtonGroup>
      </FormGroup>
      <Button type="submit" block bsSize="large" bsStyle="primary">Submit</Button>
    </form>
  }
}

export default TimeForm
