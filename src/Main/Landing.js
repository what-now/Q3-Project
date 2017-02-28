import React from 'react'
import Dashboard from '../Dashboard/Dashboard'
import TimeInput from '../TimeInput/Time-input'

export default function Landing({ user, tasks, sessions, loading }) {
  if (loading) {
    return <h2>Loading...</h2>
  }
  return tasks.length
    ? <TimeInput user={user} tasks={tasks} sessions={sessions} />
    : <Dashboard user={user} tasks={tasks} sessions={sessions} />
}
