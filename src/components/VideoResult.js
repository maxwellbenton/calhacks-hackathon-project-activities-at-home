import React from 'react';
import { List, Image } from 'semantic-ui-react'

const VideoResult = (props) =>  {
  return (
    <List.Item onClick={() => props.handleVideoSelect(props.result)}>
      <List.Content>
        <Image src={props.result.snippet.thumbnails.default.url} size='small' />
        <List.Header>{props.result.snippet.title}</List.Header>
        <List.Description>{props.result.snippet.description}</List.Description>
      </List.Content>
    </List.Item>
  )
}

export default VideoResult;