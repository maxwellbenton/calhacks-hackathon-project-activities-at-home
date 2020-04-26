import React, {useState, useEffect} from 'react'
import { Button, Icon, Modal, Header, Segment } from 'semantic-ui-react'
import VideoResult from './VideoResult'
import debounce from 'debounce'


const AboutModal =  () => {
  let [modalState, setModalState] = useState({ 
    modalOpen: false
  })
  
  const handleOpen = () => setModalState(prevState => ({...prevState, modalOpen: true }))
  const handleClose = () => setModalState(prevState => ({...prevState, modalOpen: false }))

  return (
      <Modal 
        trigger={<Icon style={{position: 'absolute', top: 0, right: 0, margin: '10px', cursor: 'pointer'}} onClick={handleOpen} name="question circle outline" size='big'/>} 
        open={modalState.modalOpen}
        style={{borderStyle: 'none', padding: '10px'}}
        size='small'
      >
        <Modal.Content>
          <div>
            <Header>About</Header>
            <p>
              <strong>At Home Sub</strong> is an app built for parents who find themselves trying to balance childcare and working from home. This app provides a way for a parent to quickly and easily set up a series of activities for a child to do, letting the parent guide what their child spends their time on while choosing how involved they'd like to be.
            </p>
            <p>
              <strong>At Home Sub</strong> was built by <a href="http://maxwellbenton.com" target="_blank">Maxwell Benton</a> for the <a href="https://hacknow.calhacks.io/" target="_blank">Cal Hacks and Postman COVID-19 hackathon</a>, using <a href="https://reactjs.org/" target="_blank">React</a>, <a href="https://react.semantic-ui.com/" target="_blank">Semantic UI</a>, the <a href="https://developers.google.com/youtube/" target="_blank">YouTube Data API</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API" target="_blank">client-side storage</a>.
            </p>
            <Icon name="heart outline" />
          </div>
        </Modal.Content>
        <Modal.Actions style={{padding: '20px 10px',}}>
            <Button floated="right" color='green' inverted onClick={handleClose}>
              <Icon name='arrow left' /> Back
            </Button>
        </Modal.Actions>
      </Modal>
    )
}

export default AboutModal

  