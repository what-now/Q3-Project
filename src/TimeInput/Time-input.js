import React, {Component} from 'react'
import './TimeInput.css'
import TimeForm from './Time-form.js'

class TimeInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      time: 0,
      location: ''
    }

    this.submit = this.submit.bind(this)
  }

  submit() {

  }

  render() {
    return <div className="container-fluid TimeInput">
      <div className="TimeInput-QuestionContainer">
          <h3 className="h2">How much time do you have right now?</h3>
      </div>
      <TimeForm submit={this.submit}/>
    </div>
  }
}

export default TimeInput
