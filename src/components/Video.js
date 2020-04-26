import React from 'react';

function getVideoKey(str) {
  return str.split('=')[1];
}

const Video = (props) => {
  let src = getVideoKey(props.url)
  console.log(props)
  return (
    <div>
      <iframe title={props.title} width="560" height="315" src={`https://www.youtube.com/embed/${src}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <div>{props.description}</div>
    </div>
  )
}

export default Video;