import React, {useState} from 'react'
import { Button, Icon, Modal, Form, Checkbox } from 'semantic-ui-react'


const CreateTaskModal = ({classId, context, handleParentClose}) => {
  let [modalState, setModalState] = useState({ 
    modalOpen: false, 
    title: "", 
    description: "", 
    completionApprovalRequired: false
  })
  
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
  const handleCreateTask = event => {
    event.preventDefault()
    context.addTaskToClass(classId, modalState.title, modalState.description, modalState.completionApprovalRequired)
    setModalState({ modalOpen: false })
    handleParentClose()
  }


  return(
    <Modal 
      trigger={<Button onClick={handleOpen}>Add Task</Button>} 
      open={modalState.modalOpen}
      size='small'
    >
      <Modal.Content>
        <Form onSubmit={handleCreateTask}>
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
        <Button color='green' inverted onClick={handleCreateTask}>
          <Icon name='checkmark' /> Add Task
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default CreateTaskModal;