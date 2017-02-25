import React, {Component} from 'react'
import { FormControl, FormGroup, InputGroup, ControlLabel, Button, ButtonGroup } from 'react-bootstrap'
import './Timeform.css'

class TimeForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      time: 0,
      location: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    console.log(event.target);
  }

  render() {
    const { submit } = this.props
    return <form onSubmit={() => submit(this.state)}>
      <FormGroup>
        <InputGroup bsSize="large" className="TimeForm-input">
          <FormControl onChange={this.handleChange}/>
          <InputGroup.Addon>hrs.</InputGroup.Addon>
          <FormControl onChange={this.handleChange}/>
          <InputGroup.Addon>min.</InputGroup.Addon>
        </InputGroup>
      </FormGroup>
      <ControlLabel>Where are you?</ControlLabel>
      <FormGroup className="TimeForm-input">
        <ButtonGroup justified bsSize="large">
          <ButtonGroup>
            <Button onClick={() => {}}>Home</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button onClick={() => {}}>Work</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button onClick={() => {}}>Anywhere</Button>
          </ButtonGroup>
        </ButtonGroup>
      </FormGroup>
      <Button itemType block bsSize="large" bsStyle="primary">Submit</Button>
    </form>
  }
}
