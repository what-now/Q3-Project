import React from 'react'
import { FormControl, ControlLabel, FormGroup, InputGroup, Button, Row, Col } from 'react-bootstrap'

export default function AdditionalTime({ updateTime, submit, time }) {
  return <form onSubmit={submit}>
    <Row>
      <Col xsPush={9} xs={3}>
        <FormGroup>
          <ControlLabel>Additional time</ControlLabel>
          <InputGroup>
            <FormControl value={time} onChange={updateTime}/>
            <InputGroup.Addon>min</InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <Button block bsStyle="primary">Add Time</Button>
      </Col>
    </Row>
  </form>
}
