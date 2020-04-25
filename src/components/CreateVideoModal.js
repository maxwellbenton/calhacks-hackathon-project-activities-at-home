import React, {useState} from 'react'
import { Button, Icon, Modal, Form, Checkbox } from 'semantic-ui-react'


const CreateVideoModal = ({classId, context, handleParentClose}) => {
  let [modalState, setModalState] = useState({ 
    modalOpen: false, 
    title: "", 
    description: "", 
    url: "",
    advanceAtEnd: true,
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
  const handleCreateVideo = () => {
    context.addVideoToClass(classId, modalState.title, modalState.url, modalState.description, modalState.advanceAtEnd, modalState.completionApprovalRequired)
    setModalState({ modalOpen: false })
    handleParentClose()
  }


  return(
    <Modal 
      trigger={<Button onClick={handleOpen}>Add Video</Button>} 
      open={modalState.modalOpen}
      basic
      size='small'
    >
      <Modal.Content>
        <Form>
          <Form.Group>
            <Form.Input onChange={handleChange} value={modalState.title} id="title" label="Activity Name" placeholder="Activity Name"/>
            <Form.Input onChange={handleChange} value={modalState.url} id="url" label="Video URL" placeholder="Video URL"/>
            <Form.TextArea onChange={handleChange} value={modalState.description} id="description" label="Activity Description" placeholder="Activity Description"/>
            <Form.Field
              control={Checkbox}
              id="advanceAtEnd"
              onChange={handleCheckboxChange} 
              checked={modalState.advanceAtEnd}
              label='Go to next activity when video ends'
            />
            <Form.Field
              control={Checkbox}
              id="completionApprovalRequired"
              onChange={handleCheckboxChange} 
              checked={modalState.completionApprovalRequired}
              label='Require parental approval before completion'
            />
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={handleClose}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button color='green' inverted onClick={handleCreateVideo}>
          <Icon name='checkmark' /> Add Video Activity
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default CreateVideoModal;