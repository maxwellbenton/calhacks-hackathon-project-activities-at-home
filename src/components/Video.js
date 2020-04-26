import React from 'react';
import { Segment, Header } from 'semantic-ui-react'

function getVideoKey(str) {
  return str.split('=')[1];
}

const Video = (props) => {
  let src = getVideoKey(props.url)
  return (
    <Segment raised style={{maxWidth: '90vw', margin: 'auto'}}>
      <Header>{props.title}</Header>
      <iframe title={props.title} width="560" height="315" src={`https://www.youtube.com/embed/${src}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <div>{props.description}</div>
    </Segment>
  )
}

export default Video;