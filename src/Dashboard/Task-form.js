import React, {Component} from 'react'
import { FormGroup, ControlLabel, FormControl, InputGroup, Radio, Button, Checkbox, Col, Row } from 'react-bootstrap'

// form for tasks inside the modal, called by form toggle as newtaskform

export default function TaskForm ({ change, submit, setTime, task }) {
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
        <FormGroup>
          <ControlLabel>Location</ControlLabel>
          <InputGroup onChange={(e) => change(e, 'location')}>
            <Radio checked={task.location === "home"} value="home" inline>Home</Radio>
            <Radio checked={task.location === "work"} value="work" inline>Work</Radio>
            <Radio checked={task.location === "anywhere"} value="anywhere" inline>Anywhere</Radio>
          </InputGroup>
        </FormGroup>
      </Col>
      <Col xs={6}>
        <FormGroup>
          <ControlLabel>Priority</ControlLabel>
          <InputGroup onChange={(e) => change(e, 'priority')}>
            <Radio checked={task.priority === "1"} value="1" inline>Low</Radio>
            <Radio checked={task.priority === "2"} value="2" inline>Medium</Radio>
            <Radio checked={task.priority === "3"} value="3" inline>High</Radio>
          </InputGroup>
        </FormGroup>
      </Col>
    </Row>
    <Button type="submit" bsStyle="primary">Add New</Button>
  </form>
}
