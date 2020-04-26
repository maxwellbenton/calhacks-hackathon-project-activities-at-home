import React from 'react'
import { Button } from 'semantic-ui-react'
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
      <h2>{classItem.title} <Button onClick={context.endClass}>Exit</Button></h2>
        {determineActivityType(activity)}
      {activity.completionApprovalRequired ? <PasswordRequired buttonText="Next" text="Password Required" password={context.data.password} action={context.advanceToNextActivity}/> : <Button onClick={context.advanceToNextActivity}>Next</Button>}
    </div>
  )
}

export default Activity;