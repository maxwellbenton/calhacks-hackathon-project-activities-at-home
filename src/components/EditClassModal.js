import React, {useState, useEffect} from 'react'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'

const EditClassModal = ({id, title, description, context}) => {
  let [modalState, setModalState] = useState({ modalOpen: false, id: null, title: "", description: "" })

  useEffect(() => {
    setModalState(prevState => ({...prevState, id, title, description}))
  }, [])

  const handleChange = event => {
    event.persist()
    setModalState(prevState => ({...prevState, [event.target.id]: event.target.value}))
  }
  
  const handleOpen = () => setModalState(prevState => ({...prevState, modalOpen: true }))
  const handleClose = () => setModalState(prevState => ({...prevState, modalOpen: false }))
  const handleUpdateClass = (event) => {
    event.persist()
    let formData = event.target.parentElement.parentNode
    let id = modalState.id
    let title = formData.childNodes[1].childNodes[0][0].value
    let description = formData.childNodes[1].childNodes[0][1].value
    context.updateClass(id, title, description)
    setModalState({modalOpen: false, id, title, description})
  }
  
  return (
  <Modal 
    trigger={<Button onClick={handleOpen}>Edit Class</Button>} 
    open={modalState.modalOpen}
    basic
    size='small'
  >
    <Header icon='arrow alternate circle right outline' content='Edit Class' />
    <Modal.Content>
      <Form>
        <Form.Group>
          <Form.Input onChange={handleChange} id="title" label="Class Name" placeholder="Class Name" value={modalState.title} />
          <Form.TextArea onChange={handleChange} id="description" label="Class Description" placeholder="Class Description" value={modalState.description} />
        </Form.Group>
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button basic color='red' inverted onClick={handleClose}>
        <Icon name='remove' /> Cancel
      </Button>
      <Button color='red' inverted onClick={() => {context.deleteClass(modalState.id)}}>
        <Icon name='trash' /> Delete Class
      </Button>
      <Button color='green' inverted onClick={handleUpdateClass}>
        <Icon name='checkmark' /> Update Class
      </Button>
    </Modal.Actions>
  </Modal>
)}

export default EditClassModal
