import React, {useState} from 'react'
import { Button, Header, Icon, Modal, List, Grid, Segment } from 'semantic-ui-react'
import CreateActivityModal from  './CreateActivityModal'
import EditVideoModal from './EditVideoModal'
import EditTaskModal from './EditTaskModal'
import EditClassModal from './EditClassModal'

const ListItem = ({title, description, handleOpen }) => {
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

const ActivityListItem = ({context, classId, activity}) => {
  return (
    <List.Item>
      <List.Content>
        <Grid padded>
          <Grid.Row columns={2}>
            <Grid.Column width={13}>
              <Header>{activity.title}</Header>
              <Header sub>{activity.description}</Header>
            </Grid.Column>
            <Grid.Column  width={3}>
              {displayEditButton(classId, context, activity)}
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
  return classItem.activities.map(activity => <ActivityListItem context={context} key={activity.activityId} classId={classId} activity={activity}/>)
}

const ClassMenuItem = (props) => {
  let [modalState, setModalState] = useState({ modalOpen: false })
  
  const handleOpen = () => setModalState({ modalOpen: true })
  const handleClose = () => setModalState({ modalOpen: false })
  return (
    <Modal 
      trigger={<ListItem handleOpen={handleOpen} {...props}/>} 
      open={modalState.modalOpen}
      size='small'
    >
      <Header icon='arrow alternate circle right outline'>
        <Icon name='book' circular />
        <Header.Content><span className="title">{props.title}</span><EditClassModal {...props}/></Header.Content>
      </Header>
      <Modal.Content>
        <Modal.Description>
          <Grid padded>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header sub>{props.description}</Header>
              </Grid.Column>
              <Grid.Column>
              <Button floated="right" disabled={props.activities.length === 0} color='green' inverted onClick={() => handleClassStart(props, handleClose)}>
                <Icon name='checkmark' /> Start Class
              </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Description>
        <Header><span className="title">Activities</span> <CreateActivityModal {...props} /></Header>
        <div className="listBox">
          <Segment vertical style={{overflow: 'auto' }}>
            <List selection verticalAlign='middle' divided relaxed>
              {displayClassActivities(props)}
            </List>
            </Segment>
          </div>
      </Modal.Content>
      <Modal.Actions>
      <Button inverted primary onClick={handleClose}>
        <Icon name='remove' /> Cancel
      </Button>
      <Button floated="right" disabled={props.activities.length === 0} color='green' inverted onClick={() => handleClassStart(props, handleClose)}>
        <Icon name='checkmark' /> Start Class
      </Button>
    </Modal.Actions>
    </Modal>
  )
}

export default ClassMenuItem;

//</Modal><CreateActivityModal {...props} />