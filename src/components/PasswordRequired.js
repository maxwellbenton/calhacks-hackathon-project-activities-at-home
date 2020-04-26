import React, {useState} from 'react'
import { Button, Icon, Modal, Form } from 'semantic-ui-react'


const PasswordRequired = ({buttonText, text, password, action}) => {
  let [modalState, setModalState] = useState({ modalOpen: false, password: "" })
  const handleOpen = () => setModalState({ modalOpen: true })
  const handleClose = () => setModalState({ modalOpen: false })
  const handleChange = event => {
    event.persist()
    setModalState(prevState => ({...prevState, [event.target.id]: event.target.value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(password === modalState.password) {
      action()
    } else {
      alert('Password Incorrect. Plesae try again')
    }
  }

  return(
    <Modal 
      trigger={<Button basic onClick={handleOpen}>{buttonText}</Button>} 
      open={modalState.modalOpen}
      basic
      size='small'
    >
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Input type='password' onChange={handleChange} value={modalState.password} id="password" label="Password Required" placeholder={text}/>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={handleClose}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button color='red' inverted onClick={handleSubmit}>
          <Icon name='check' /> Submit
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default PasswordRequired;