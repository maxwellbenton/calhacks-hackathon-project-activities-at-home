import React from 'react';
import { List, Image, Grid } from 'semantic-ui-react'

const VideoResult = (props) =>  {
  return (
    <List.Item onClick={() => props.handleVideoSelect(props.result)}>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={4}>
            <Image rounded src={props.result.snippet.thumbnails.default.url} size='small' />
          </Grid.Column>
          <Grid.Column width={9}>
            <List.Content>
              <List.Header>{props.result.snippet.title}</List.Header>
              <List.Description>{props.result.snippet.description}</List.Description>
            </List.Content>
          </Grid.Column>
        </Grid.Row>>
      </Grid>
    </List.Item>
  )
}

export default VideoResult;