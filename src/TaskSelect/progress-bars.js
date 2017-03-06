import React from 'react'
import {ProgressBar, Popover, OverlayTrigger} from 'react-bootstrap'
import moment from 'moment'

export default function ProgressBarGroup({sessions, time, render}) {
  return <ProgressBar>
    {console.log(sessions)}
    {sessions.map((obj, index) => <ProgressBar now={obj.duration * 100/ time} label={`${obj.duration} min.`} bsStyle={index % 2 ? "default" : "info"} active={moment(obj.created_at).add(obj.duration, 'm').isAfter(moment())}/>
    )}
    <ProgressBar active now={render * 100/ time}/>
  </ProgressBar>
}

function InfoPop( duration, created_at ) {
  return <Popover title={`${duration} min.`}>{moment(created_at).calendar()}</Popover>
}
