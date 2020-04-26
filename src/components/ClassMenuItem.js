import React, {useState} from 'react'
import { Button, Header, Icon, Modal, List } from 'semantic-ui-react'
import CreateActivityModal from  './CreateActivityModal'
import EditVideoModal from './EditVideoModal'
import EditTaskModal from './EditTaskModal'
import EditClassModal from './EditClassModal'

const ListItem = ({title, description, handleOpen}) => {
  return (
    <List.Item onClick={handleOpen}>
      <List.Content>
        <List.Header>{title}</List.Header>
        <List.Description>{description}</List.Description>
      </List.Content>
    </List.Item>
  )
}

const displayEditButton = (classId, context, activity) => {
  switch(activity.type) {
    case "Video":
      return <EditVideoModal context={context} classId={classId} activityId={activity.activityId} title={activity.title} description={activity.description} url={activity.url} advanceAtEnd={activity.advanceAtEnd} completionApprovalRequired={activity.completionApprovalRequired}/>
    case "Task":
      return <EditTaskModal context={context} classId={classId} activityId={activity.activityId} title={activity.title} description={activity.description} completionApprovalRequired={activity.completionApprovalRequired}/>
    default:
      return null;
  }
}

const Activity = ({context, classId, activity}) => {
  return (
    <List.Item>
      <List.Content>
        <List.Header>{activity.title}</List.Header>
        <List.Header>{activity.description}</List.Header>
        {displayEditButton(classId, context, activity)}
      </List.Content>
    </List.Item>
  )
}

const handleClassStart = ({classId, context}, handleClose) => {
  context.setCurrentClass(classId)
  handleClose()
}

const displayClassActivities = ({classId, context}) => {
  let classItem = context.data.classes.find(classItem => classItem.id === classId)
  return classItem.activities.map(activity => <Activity context={context} key={activity.activityId} classId={classId} activity={activity}/>)
}

const ClassMenuItem = (props) => {
  let [modalState, setModalState] = useState({ modalOpen: false })
  
  const handleOpen = () => setModalState({ modalOpen: true })
  const handleClose = () => setModalState({ modalOpen: false })

  return (
    <Modal 
      trigger={<ListItem handleOpen={handleOpen} {...props}/>} 
      open={modalState.modalOpen}
      basic
      size='small'
    >
      <Header icon='arrow alternate circle right outline' content={props.title} /><EditClassModal {...props}/>
      <h3>{props.description}</h3>
      <h3>Activities <CreateActivityModal {...props} /></h3>
      <div className="listBox">
        <List selection verticalAlign='middle' divided relaxed>
          {displayClassActivities(props)}
        </List>
      </div>
      <Modal.Actions>
      <Button basic color='red' inverted onClick={handleClose}>
        <Icon name='remove' /> Cancel
      </Button>
      <Button disabled={props.activities.length === 0} color='green' inverted onClick={() => handleClassStart(props, handleClose)}>
        <Icon name='checkmark' /> Start Class
      </Button>
    </Modal.Actions>
    </Modal>
  )
}

export default ClassMenuItem;

//</Modal><CreateActivityModal {...props} />