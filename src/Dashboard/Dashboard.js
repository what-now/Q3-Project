import React, {Component} from 'react'
import Progress from './Progress'
import FormToggle from  './Form-toggle'

// main component for Dashboard. Called by Main.

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {

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
        this.props.tasks.length
        ? <Progress tasks={this.props.tasks}/>
        : null
      }
      <FormToggle/>
    </div>
  }

}

export default Dashboard
