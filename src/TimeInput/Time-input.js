import React, {Component} from 'react'
import './TimeInput.css'
import TimeForm from './Time-form.js'
import TaskModal from '../TaskSelect/Task-modal'

// input component, called by main.

class TimeInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filtered: []
    }

    this.submit = this.submit.bind(this)
  }

  submit(event, obj) {
    event.preventDefault()
    this.setState({filtered: [{
      id: 1,
      user_id: 1,
      title: 'Sample Data',
      description: 'make sure to clean grab kitchen towels',
      location: 'home',
      required_time: 60,
      total_time: 30,
      priority: 1,
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC'),
      completed_at: null
    },{
      id: 1,
      user_id: 1,
      title: 'Sample Data 2',
      description: 'make sure to clean grab kitchen towels',
      location: 'home',
      required_time: 60,
      total_time: 30,
      priority: 1,
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC'),
      completed_at: null
    },{
      id: 1,
      user_id: 1,
      title: 'Sample Data 3',
      description: 'make sure to clean grab kitchen towels',
      location: 'home',
      required_time: 60,
      total_time: 30,
      priority: 1,
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC'),
      completed_at: null
    }]})
    // filter from this.props.tasks, set to state as filtered.
  }

  render() {
    return (
      <div className="container-fluid TimeInput">
        <div className="TimeInput-QuestionContainer">
          <h3 className="h2">How much time do you have right now?</h3>
        </div>
        <TimeForm submit={this.submit}/>
        {this.state.filtered.length
          ? <TaskModal tasks={this.state.filtered} />
          : null
        }
      </div>
    )
  }

  componentWillMount() {
    // redirect to dashboard if tasks.length < 1
  }
}

export default TimeInput
