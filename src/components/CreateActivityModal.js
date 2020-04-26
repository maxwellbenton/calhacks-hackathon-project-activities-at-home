import React, {useState} from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import CreateVideoModal from './CreateVideoModal'
import CreateTaskModal from './CreateTaskModal'

const CreateActivityModal = ({classId, context}) => {
  let [modalState, setModalState] = useState({ modalOpen: false })

  const handleOpen = () => setModalState({ modalOpen: true })
  const handleClose = () => setModalState({ modalOpen: false })

  return (
  <Modal 
    trigger={<Button color="green" inverted onClick={handleOpen}>Add Activity</Button>} 
    open={modalState.modalOpen}
    size='small'
  >
    <Header icon='arrow alternate circle right outline' content='Create New Activity' />
    <Modal.Content>
      <CreateVideoModal classId={classId}  context={context} handleParentClose={handleClose}/>
      <CreateTaskModal classId={classId}  context={context} handleParentClose={handleClose}/>
    </Modal.Content>
    <Modal.Actions>
      <Button inverted primary onClick={handleClose}>
        <Icon name='remove' /> Cancel
      </Button>
    </Modal.Actions>
  </Modal>
)}

export default CreateActivityModal
