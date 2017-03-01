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
      index: 0,
      time: 0
    }

    this.submit = this.submit.bind(this)
    this.reset = this.reset.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleButtons = this.handleButtons.bind(this)
    this.del = this.del.bind(this)
    this.changeIndex = this.changeIndex.bind(this)
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

  changeIndex(increment) {
    this.setState({ index: this.state.index + increment })
  }

  submit(event) {
    if (event) {
      event.preventDefault()
    }

    const { location, hours, minutes } = this.state
    const time = +hours * 60 + +minutes

    const { tasks } = this.props

    const filtered = tasks.filter(task =>
      (task.location === location || task.location === 'anywhere') && (task.dividable || task.required_time <= time)
    ).sort((task1, task2) => task2.priority - task1.priority)

    this.setState({ filtered, time })
  }

  del() {
    let index = this.state.index;
    const filtered = [...this.state.filtered];
    filtered.splice(index, 1);

    if (index === this.state.filtered.length - 1) {
      index -= 1;
    }

    this.setState({ filtered, index })
  }

  render() {
    const { hours, minutes, location, time, index, filtered } = this.state
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
        ? <TaskModal refreshTasks={this.props.refreshTasks} index={index} tasks={filtered} time={time} reset={this.reset} del={this.del} changeIndex={this.changeIndex}/>
        : null
      }
    </div>
  }
}

export default TimeInput
