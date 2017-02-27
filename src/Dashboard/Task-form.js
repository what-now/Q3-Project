import React, {Component} from 'react'
import { FormGroup, ControlLabel, FormControl, InputGroup, Radio, Button } from 'react-bootstrap'

// form for tasks inside the modal, called by form toggle as newtaskform

class TaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      task: {
        title:'',
        description:'',

      }
    }

  }

  render() {
    return <form onSubmit={(event) => {
      event.preventDefault()
      this.props.submit(this.state.task)
    }}>
      <FormGroup>
        <ControlLabel>Task</ControlLabel>
        <FormControl type="text" value={this.state.task.title} />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Description</ControlLabel>
        <FormControl componentClass="textarea" value={this.state.task.description}/>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Estimated time required</ControlLabel>
        <InputGroup>
          <FormControl/>
          <InputGroup.Addon>hrs.</InputGroup.Addon>
          <FormControl/>
          <InputGroup.Addon>min.</InputGroup.Addon>
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Priority</ControlLabel>
        <InputGroup>
          <Radio inline>1</Radio>
          <Radio inline>2</Radio>
          <Radio inline>3</Radio>
        </InputGroup>
      </FormGroup>
      <Button type="submit" bsStyle="primary">Add New</Button>
    </form>
  }
}

export default TaskForm
