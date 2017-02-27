import React, {Component} from 'react'
import './TimeInput.css'
import TimeForm from './Time-form.js'

// input component, called by main.

class TimeInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filterFunction() {}
    }

    this.submit = this.submit.bind(this)
  }

  submit() {
    // return a filter function, set to state.
  }

  render() {
    return <div className="container-fluid TimeInput">
      <div className="TimeInput-QuestionContainer">
          <h3 className="h2">How much time do you have right now?</h3>
      </div>
      <TimeForm submit={this.submit}/>
    </div>
  }

  componentWillMount() {
    // redirect to dashboard if tasks.length < 1
  }
}

export default TimeInput
