import React, {useState, useEffect} from 'react'
import { Button, Icon, Modal, Form, Checkbox, List } from 'semantic-ui-react'
import VideoResult from './VideoResult'
import debounce from 'debounce'


const EditVideoModal = ({classId, activityId, context, handleParentClose, title, description, url, advanceAtEnd, completionApprovalRequired}) => {
  let [modalState, setModalState] = useState({ 
    modalOpen: false, 
    activityId: null,
    title: "", 
    description: "", 
    url: "",
    selectedVideo: null,
    searchResults: [],
    advanceAtEnd: true,
    completionApprovalRequired: false
  })

  useEffect(() => {
    setModalState(prevState => ({...prevState, title, description, url, advanceAtEnd, completionApprovalRequired, activityId}))
  }, [modalState.modalOpen])

  const getSearchResults = (query) => {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${process.env.REACT_APP_YOUTUBE_API}`)
    .then(results => results.json())
    .then(json => {
      setModalState(prevState => ({
        ...prevState,
        searchResults: json.items
      }))
    })
  }

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
  const handleUpdateVideo = () => {
    context.updateVideo(classId, modalState.title, modalState.url, modalState.description, modalState.advanceAtEnd, modalState.completionApprovalRequired, modalState.activityId)
    setModalState({ modalOpen: false })
    
  }

  const handleDelete = () => {
    context.deleteActivity(classId, modalState.activityId)
    setModalState({ modalOpen: false })
  }

  const handleSearchChange = event => debounce(getSearchResults(event.target.value), 500)
  const handleVideoSelect = (selectedVideo) => {
    setModalState(prevState => ({
      ...prevState,
      url: `https://www.youtube.com/watch?v=${selectedVideo.id.videoId}`,
      selectedVideo: selectedVideo
    }))
  }


  return(
    <Modal 
      trigger={<Button onClick={handleOpen}>Edit Video</Button>} 
      open={modalState.modalOpen}
      basic
      size='small'
    >
      <Modal.Content>
        <Form>
          <Form.Group>
            <Form.Input onChange={handleChange} value={modalState.title} id="title" label="Activity Name" placeholder="Activity Name"/>
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
            <Form.Input readOnly value={modalState.url} id="url" label="Video URL" placeholder="Video URL"/>
            {modalState.selectedVideo ? <VideoResult result={modalState.selectedVideo} handleVideoSelect={() => {}}/> : null}
            <Form.Input onChange={handleSearchChange} id="search" label="Video Search" placeholder="Search Youtube"/>
            <List>
              {modalState.searchResults && modalState.searchResults.length > 0 ? modalState.searchResults.map(result => <VideoResult result={result} handleVideoSelect={handleVideoSelect}/>) : null}
            </List>
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={handleClose}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button color='red' inverted onClick={handleDelete}>
          <Icon name='trash' /> Delete Video Activity
        </Button>
        <Button color='green' inverted onClick={handleUpdateVideo}>
          <Icon name='checkmark' /> Update Video Activity
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default EditVideoModal;