import React from 'react'
import Dashboard from '../Dashboard/Dashboard'
import TimeInput from '../TimeInput/Time-input'
import FeedbackModal from '../Feedback/Feedback-modal'
import moment from 'moment'

export default function Landing({ user, tasks, sessions, loading, refreshTasks, refreshSessions }) {
  if (loading) {
    return <h2>Loading...</h2>
  }

  const feedback = sessions.filter(({feedback, created_at, duration}) => !feedback && moment(created_at).add(duration, 'm').isBefore(moment()))

  if (feedback.length) {
    return <FeedbackModal refreshTasks={refreshTasks} refreshSessions={refreshSessions} session={feedback[0]}/>
  }
  return tasks.length
    ? <TimeInput user={user} tasks={tasks} sessions={sessions} refreshTasks={refreshTasks} refreshSessions={refreshSessions}/>
    : <Dashboard user={user} tasks={tasks} sessions={sessions} refreshTasks={refreshTasks} refreshSessions={refreshSessions}/>
}
