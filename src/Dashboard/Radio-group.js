import React from 'react'
import {FormGroup, ControlLabel, InputGroup, Radio} from 'react-bootstrap'

export default function RadioGroup({ stateKey, options, change, task, label }) {
    return <FormGroup>
      <ControlLabel>{label}</ControlLabel>
      <InputGroup onChange={(e) => change(e, stateKey)}>
        {options.map(obj => {
          return <Radio key={obj.value} checked={task[stateKey] === obj.value} value={obj.value} inline>{obj.string}</Radio>
        })}
      </InputGroup>
    </FormGroup>
}
