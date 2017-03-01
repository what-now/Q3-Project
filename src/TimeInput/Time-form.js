import React from 'react'
import { FormControl, FormGroup, InputGroup, ControlLabel, Button, ButtonGroup, Glyphicon } from 'react-bootstrap'
import './Timeform.css'

// form inside the input page, called by time-input

export default function TimeForm({ submit, location, handleChange, handleButtons, hours, minutes }) {
  return <form onSubmit={submit}>
    <FormGroup>
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
          <Button value="home" active={location === 'home'} onClick={handleButtons}><Glyphicon glyph="home"/> Home</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button value="work" active={location === 'work'} onClick={handleButtons}><Glyphicon glyph="briefcase"/> Work</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button value="anywhere" active={location === 'anywhere'} onClick={handleButtons}>Other</Button>
        </ButtonGroup>
      </ButtonGroup>
    </FormGroup>
    <Button type="submit" block bsSize="large" bsStyle="primary">Submit</Button>
  </form>
}
