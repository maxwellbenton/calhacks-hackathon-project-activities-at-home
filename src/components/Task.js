import React from 'react';
import { Segment, Header } from 'semantic-ui-react'

const Task = (props) => {
  return (
    <Segment raised style={{maxWidth: '90vw', margin: 'auto'}}>
      <Header>{props.title}</Header>
      <div>{props.description}</div>
    </Segment>
  )
}

export default Task;