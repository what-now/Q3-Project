import React, {Component} from 'react'
// import {browserHistory} from 'react-router'
import './TimeInput.css'
import TimeForm from './Time-form.js'
import TaskModal from '../TaskSelect/Task-modal'

// input component, called by main.

class TimeInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hours: '',
      minutes: '',
      location: '',
      filtered: [],
      time: 0
    }

    this.submit = this.submit.bind(this)
    this.reset = this.reset.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleButtons = this.handleButtons.bind(this)
  }

  reset() {
    this.setState({
      filtered: [],
      hours: '',
      minutes: ''
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleButtons({ target }) {
    this.setState({ location: target.value })
  }

  submit(event) {
    event.preventDefault()

    const { location, hours, minutes } = this.state
    const time = +hours * 60 + +minutes

    const { tasks } = this.props

    const filtered = tasks.filter(task =>
      (task.location === location || task.location === 'anywhere') && (task.dividable || task.required_time <= time)
    ).sort((task1, task2) => task2.priority - task1.priority)

    this.setState({ filtered, time })
  }

  render() {
    const { hours, minutes, location } = this.state
    return <div className="container-fluid TimeInput">
      <div className="TimeInput-QuestionContainer">
        <h3 className="h2">How much time do you have right now?</h3>
      </div>
      <TimeForm
        submit={this.submit}
        handleChange={this.handleChange}
        handleButtons={this.handleButtons}
        hours={hours}
        minutes={minutes}
        location={location}
      />
      {this.state.filtered.length
        ? <TaskModal refreshTasks={this.props.refreshTasks} tasks={this.state.filtered} time={this.state.time} reset={this.reset}/>
        : null
      }
    </div>
  }
}

export default TimeInput
