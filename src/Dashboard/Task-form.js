import React from 'react'
import { FormGroup, ControlLabel, FormControl, InputGroup, Button, Checkbox, Col, Row } from 'react-bootstrap'
import {browserHistory} from 'react-router'
import RadioGroup from './Radio-group'

// form for tasks inside the modal, called by form toggle as newtaskform

export default function TaskForm ({ change, checkbox, submit, setTime, task, modalInfo }) {
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
    browserHistory.push('dashboard');
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
      <Col xs={6}>
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
      <Col xs={6}>
        <FormGroup>
          <ControlLabel>Dividable task?</ControlLabel>
          <Checkbox checked={task.dividable} onChange={(e) => checkbox(e, 'dividable')}>Use multiple sessions if necessary</Checkbox>
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
    <div className="add-task-button-div">
      <Button type="submit" bsStyle="primary">{modalInfo.btnName}</Button>
    </div>
  </form>
}
