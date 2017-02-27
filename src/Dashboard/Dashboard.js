import React, {Component} from 'react'
import Progress from './Progress'
import FormToggle from  './Form-toggle'

// main component for Dashboard. Called by Main.

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tasks: [{
        id:1,
        user_id:1,
        title: 'some task',
        description: 'hard-coded sample data',
        required_time: 150,
        total_time: 120,
        previously_at: '2017-02-21 00:00:00 PST',
        priority: 2
      },{
        id:2,
        user_id:1,
        title: 'some task',
        description: 'hard-coded sample data',
        required_time: 150,
        total_time: 120,
        previously_at: '2017-02-21 00:00:00 PST',
        priority: 2
      }],

    }
  }

  render() {
    return <div className="container-fluid">
      <h4>Progress</h4>
      {/* {
        this.state.current
        ? <OnGoing sessions={this.state.current} />
        : null
      } */}
      {
        this.state.tasks.length
        ? <Progress tasks={this.state.tasks}/>
        : null
      }
      <FormToggle/>
    </div>
  }

}

export default Dashboard
