import React, {useState, useEffect} from 'react'
import { Button, Icon, Modal, Form, Checkbox } from 'semantic-ui-react'


const EditTaskModal = ({classId, activityId, context, handleParentClose, title, description, completionApprovalRequired}) => {
  let [modalState, setModalState] = useState({ 
    modalOpen: false, 
    activityId: null,
    title: "", 
    description: "", 
    completionApprovalRequired: false
  })

  useEffect(() => {
    setModalState(prevState => ({...prevState, title, description, completionApprovalRequired, activityId}))
  }, [modalState.modalOpen])

  const handleChange = event => {
    event.persist()
    setModalState(prevState => ({
      ...prevState,
      [event.target.id]: event.target.value
    }))
  }

  const handleCheckboxChange = event => {
    event.persist()
    setModalState(prevState => ({
      ...prevState,
      [event.target.id]: !prevState[event.target.id]
    }))
  }

  const handleOpen = () => setModalState({ modalOpen: true })
  const handleClose = () => setModalState({ modalOpen: false })
  const handleUpdateTask = (event) => {
    event.preventDefault()
    context.updateTask(classId, modalState.title, modalState.url, modalState.description, modalState.advanceAtEnd, modalState.completionApprovalRequired, modalState.activityId)
    setModalState({ modalOpen: false })
    
  }

  const handleDelete = () => {
    context.deleteActivity(classId, modalState.activityId)
    setModalState({ modalOpen: false })
  }

  console.log(modalState)

  return(
    <Modal 
      trigger={<Button basic floated="right" onClick={handleOpen}>Edit Task</Button>} 
      open={modalState.modalOpen}
      size='small'
    >
      <Modal.Content>
        <Form onSubmit={handleUpdateTask}>
            <Form.Input onChange={handleChange} value={modalState.title} id="title" label="Activity Name" placeholder="Activity Name"/>
            <Form.TextArea onChange={handleChange} value={modalState.description} id="description" label="Activity Description" placeholder="Activity Description"/>
            <Form.Field
              control={Checkbox}
              id="completionApprovalRequired"
              onChange={handleCheckboxChange} 
              checked={modalState.completionApprovalRequired}
              label='Require parental approval before completion'
            />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button inverted primary inverted onClick={handleClose}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button color='red' inverted onClick={handleDelete}>
          <Icon name='trash' /> Delete Task
        </Button>
        <Button color='green' inverted onClick={handleUpdateTask}>
          <Icon name='checkmark' /> Update Task
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default EditTaskModal;