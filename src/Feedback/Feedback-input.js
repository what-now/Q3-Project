import React from 'react'
import { FormControl, ControlLabel, FormGroup, InputGroup, Button, Row, Col } from 'react-bootstrap'

export default function AdditionalTime({ updateTime, submit, time }) {
  return <form onSubmit={(event) => submit(event)}>
    <Row>
      <Col xsPush={8} xs={4}>
        <FormGroup>
          <ControlLabel>Additional time</ControlLabel>
          <InputGroup>
            <FormControl value={time} onChange={updateTime}/>
            <InputGroup.Addon>min</InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <Button block type="submit" bsStyle="primary">Add Time</Button>
      </Col>
    </Row>
  </form>
}
