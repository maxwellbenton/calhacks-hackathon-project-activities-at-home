import React from 'react'
import { Button, Header } from 'semantic-ui-react'
import Video from './Video'
import Task from './Task'
import PasswordRequired from './PasswordRequired'

const determineActivityType = (activity) => {
  switch(activity.type) {
    case "Video":
      return <Video {...activity}/>
    case "Task":
      return <Task {...activity}/>
    default:
      return null
  }
}

const Activity = ({context, classId, activityId}) => {
  let classItem = context.data.classes.find(classItem => classItem.id === classId)
  let activity = classItem.activities.find(activity => activity.activityId === activityId)
  return (
    <div>
      <Header as="h2">{classItem.title} <PasswordRequired buttonText="Exit" text="Password Required" password={context.data.password} action={context.endClass}/></Header>
        {determineActivityType(activity)}
      <div style={{padding: '10px 0'}}>
        {activity.completionApprovalRequired ? <PasswordRequired buttonText="Next" text="Password Required" password={context.data.password} action={context.advanceToNextActivity}/> : <Button onClick={context.advanceToNextActivity}>Next</Button>}
      </div>
    </div>
  )
}

export default Activity;