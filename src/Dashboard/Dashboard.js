import React, {Component} from 'react'
import {PageHeader, Alert, Row, Col, Button} from 'react-bootstrap'
import Progress from './Progress'
import FormToggle from  './Form-toggle'
import Completed from './Completed'
import Sessions from './Sessions'
import request from 'axios'

// main component for Dashboard. Called by Main.

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalVisible: false,
      modalInfo: {
        title: '',
        btnName: '',
        route: '',
        taskId: null
      },
      task: {
        title:'',
        description:'',
        required_time: 0,
        location: '',
        priority: 1,
        dividable: true,
      },
      currentSessions: []
    }

    this.toggleTaskModal = this.toggleTaskModal.bind(this)
    this.submitTask = this.submitTask.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.recalculateTime = this.recalculateTime.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const allSessions = nextProps.sessions;
    const onGoing = allSessions.filter((obj) => {
      return !obj.finished
    })
    this.setState({
      currentSessions: onGoing
    })
    console.log('currentSessions', onGoing);
    console.log('next Props', nextProps.sessions);
  }

  toggleTaskModal(taskObj) {
    let isEmpty = true;
    for(const prop in taskObj) {
      if (taskObj.hasOwnProperty(prop)) {
        isEmpty = false;
      }
    }

    if (isEmpty) {
      this.setState({
        modalVisible: !this.state.modalVisible,
        modalInfo: {
          title: 'New Task',
          btnName: 'Add Task',
          route: 'post',
          taskId: null
        },
        task: {
          title:'',
          description:'',
          required_time: 0,
          location: '',
          priority: 1,
          dividable: true,
        }
      });
    } else {
      const { title, description, required_time, location, priority, dividable, id } = taskObj;
      this.setState({
        modalVisible: !this.state.modalVisible,
        modalInfo: {
          title: 'Edit Task',
          btnName: 'Submit',
          route: 'patch',
          taskId: id
        },
        task: { title, description, required_time, location, priority, dividable, id }
      });
    }
  }

  recalculateTime(hrs, min) {
    const value = +hrs * 60 + +min

    this.handleChange({target: { value }}, 'required_time')
  }

  handleCheckbox(event, field) {
    const task = {...this.state.task, [field]: event.target.checked}
    this.setState({ task })
  }

  handleChange(event, field) {
    const task = {...this.state.task, [field]: event.target.value}
    this.setState({ task })
  }

  submitTask() {
    if (this.state.modalInfo.route === 'post') {
      request.post(`/api/tasks`, this.state.task).then((res) => {
        this.setState({
          modalVisible: false,
          task:{
            title:'',
            description:'',
            estimated_time: 0,
            location: '',
            priority: 1,
          }
        })
        this.props.refreshTasks();
      })
    } else {
      request.patch(`/api/tasks/edit/${this.state.modalInfo.taskId}`, this.state.task).then((res) => {
        this.setState({
          modalVisible: false,
          task:{
            title:'',
            description:'',
            estimated_time: 0,
            location: '',
            priority: 1,
          }
        })
        this.props.refreshTasks();
      })
    }

  }

  render() {
    const { user, tasks, refreshTasks, sessions } = this.props;
    return <div className="container-fluid">
      <PageHeader>Dashboard <small>{user.email}</small></PageHeader>
      {/* {
        this.state.current
        ? <OnGoing sessions={this.state.current} />
        : null
      } */}
      <Sessions sessions={this.state.currentSessions} />
      {
        tasks.length
        ? <div>
          <h4>Progress</h4>
          <Progress tasks={tasks} refreshTasks={refreshTasks} sessions={sessions} toggleTaskModal={this.toggleTaskModal} />
        </div>
        : <Row>
          <Col xs={12}>
            <Alert bsStyle="info">No tasks saved. Please add new tasks.</Alert>
          </Col>
        </Row>
      }
      <Button bsStyle="primary" onClick={() => this.toggleTaskModal({})}>Add Task</Button>
      <FormToggle
          refreshTasks={refreshTasks}
          modalVisible={this.state.modalVisible} toggleTaskModal={this.toggleTaskModal} recalculateTime={this.recalculateTime}
          handleChange={this.handleChange}
          handleCheckbox={this.handleCheckbox}
          task={this.state.task}
          submitTask={this.submitTask}
          modalInfo={this.state.modalInfo}
        />
      <Completed tasks={this.props.tasks.filter(obj => obj.completed_at)} />
    </div>
  }
}

export default Dashboard
