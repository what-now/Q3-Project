import React from 'react'
import { FormGroup, ControlLabel, FormControl, InputGroup, Button, Col, Row } from 'react-bootstrap'
import RadioGroup from './Radio-group'

// form for tasks inside the modal, called by form toggle as newtaskform

export default function TaskForm ({ change, submit, setTime, task }) {
  const radioOptionsLocation = [
    { string: 'Home', value: 'home' },
    { string: 'Work', value: 'work' },
    { string: 'Anywhere', value: 'anywhere' }
  ]
  const radioOptionsPriority = [
    { string:'High', value: '3' },
    { string:'Medium', value: '2'},
    { string:'Low', value: '1' }
  ]

  return <form onSubmit={(event) => {
    event.preventDefault()
    submit()
  }}>
    <Row>
      <Col xs={12}>
        <FormGroup>
          <ControlLabel>Task</ControlLabel>
          <FormControl type="text" value={task.title} onChange={(e) => change(e, 'title')} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Description</ControlLabel>
          <FormControl componentClass="textarea" value={task.description} onChange={(e) => change(e, 'description')}/>
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col xs={7}>
        <FormGroup>
          <ControlLabel>Estimated time required</ControlLabel>
          <InputGroup onChange={() => setTime(document.getElementById('hrs').value, document.getElementById('min').value)}>
            <FormControl type="number" id="hrs"/>
            <InputGroup.Addon>hrs.</InputGroup.Addon>
            <FormControl type="number" id="min"/>
            <InputGroup.Addon>min.</InputGroup.Addon>
          </InputGroup>
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col xs={6}>
        <RadioGroup options={radioOptionsLocation} stateKey={'location'} task={task} change={change} label="Location"/>
      </Col>
      <Col xs={6}>
        <RadioGroup options={radioOptionsPriority} stateKey={'priority'} task={task} change={change} label="Priority"/>
      </Col>
    </Row>
    <Button type="submit" bsStyle="primary">Add New</Button>
  </form>
}
