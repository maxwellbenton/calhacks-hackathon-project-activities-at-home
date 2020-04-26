import React, {useState} from 'react'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'

const CreateClassModal = ({context}) => {
  let [modalState, setModalState] = useState({ modalOpen: false, title: "", description: "" })
  const handleChange = event => {
    event.persist()
    setModalState(prevState => ({
      ...prevState,
      [event.target.id]: event.target.value
    }))
  }

  const handleOpen = () => setModalState({ modalOpen: true })
  const handleClose = () => setModalState({ modalOpen: false })
  const handleCreateClass = (event) => {
    event.persist()
    context.createClass(modalState.title, modalState.description)
    setModalState({ modalOpen: false })
  }

  return (
  <Modal 
    trigger={<Button onClick={handleOpen}>Create Class</Button>} 
    open={modalState.modalOpen}
    basic
    size='small'
  >
    <Header icon='arrow alternate circle right outline' content='Create New Class' />
    <Modal.Content>
      <Form>
        <Form.Group>
          <Form.Input onChange={handleChange} value={modalState.title} id="title" label="Class Name" placeholder="Class Name"/>
          <Form.TextArea onChange={handleChange} value={modalState.description} id="description" label="Class Description" placeholder="Class Description"/>
        </Form.Group>
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button basic color='red' inverted onClick={handleClose}>
        <Icon name='remove' /> Cancel
      </Button>
      <Button color='green' inverted onClick={handleCreateClass}>
        <Icon name='checkmark' /> Create Class
      </Button>
    </Modal.Actions>
  </Modal>
)}

export default CreateClassModal
