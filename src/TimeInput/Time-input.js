import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import './TimeInput.css'
import TimeForm from './Time-form.js'
import TaskModal from '../TaskSelect/Task-modal'

// input component, called by main.

class TimeInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filtered: [],
      time: 0
    }

    this.submit = this.submit.bind(this)
  }

  submit(event, obj) {
    event.preventDefault()

    const { location, time } = obj
    const { tasks } = this.props

    const filtered = tasks.filter(task =>
      (task.location === location || task.location === 'anywhere') && (task.dividable || task.required_time <= time)
    ).sort((task1, task2) => task2.priority - task1.priority)

    this.setState({ filtered , time: obj.time })
  }

  render() {
    return <div className="container-fluid TimeInput">
      <div className="TimeInput-QuestionContainer">
        <h3 className="h2">How much time do you have right now?</h3>
      </div>
      <TimeForm submit={this.submit}/>
      {this.state.filtered.length
        ? <TaskModal tasks={this.state.filtered} time={this.state.time}/>
        : null
      }
    </div>
  }
}

export default TimeInput
