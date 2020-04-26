import React, {useState} from 'react'
import { Button, Icon, Modal, Form, Checkbox, List, Segment, Grid } from 'semantic-ui-react'
import VideoResult from './VideoResult'
import debounce from 'debounce'

const CreateVideoModal = ({classId, context, handleParentClose}) => {
  let [modalState, setModalState] = useState({ 
    modalOpen: false, 
    title: "", 
    description: "", 
    url: "",
    selectedVideo: null,
    searchResults: [],
    advanceAtEnd: true,
    completionApprovalRequired: false
  })

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
  const handleCreateVideo = event => {
    event.preventDefault()
    context.addVideoToClass(classId, modalState.title, modalState.url, modalState.description, modalState.advanceAtEnd, modalState.completionApprovalRequired)
    setModalState({ modalOpen: false })
    handleParentClose()
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
      trigger={<Button onClick={handleOpen}>Add Video</Button>} 
      open={modalState.modalOpen}
      size='large'
      style={{height: '90vh'}}
    >
        <Grid padded>
          <Grid.Row columns={2}>
            <Grid.Column>
            <Modal.Content>
              <Form onSubmit={handleCreateVideo}>
                <Form.Input onChange={handleChange} value={modalState.title} id="title" label="Activity Name" placeholder="Activity Name"/>
                <Form.TextArea onChange={handleChange} value={modalState.description} id="description" label="Activity Description" placeholder="Activity Description"/>
                <Form.Field
                  control={Checkbox}
                  id="completionApprovalRequired"
                  onChange={handleCheckboxChange} 
                  checked={modalState.completionApprovalRequired}
                  label='Require parental approval before completion'
                />
                <Form.Input value={modalState.url} id="url" label="Video URL" placeholder="Enter Manually or Use the Search Below"/>
                <Form.Group>
                  <List divided>
                    {modalState.selectedVideo ? <VideoResult result={modalState.selectedVideo} handleVideoSelect={() => {}}/> : null}
                  </List>
                </Form.Group>
                <Form.Input onChange={handleSearchChange} id="search" label="Video Search" placeholder="Search Youtube"/>
              </Form>
            </Modal.Content>
            <Modal.Actions style={{padding: '10px 0'}}>
              <Button floated='right' color='green' inverted onClick={handleCreateVideo}>
                <Icon name='checkmark' /> Add Video Activity
              </Button>
              <Button floated='right' inverted primary onClick={handleClose}>
                <Icon name='remove' /> Cancel
              </Button>
            </Modal.Actions>
            </Grid.Column>
            <Grid.Column>
              <Segment vertical style={{overflow: 'auto', maxHeight: "85vh" }}>
                <List divided selection>
                  {modalState.searchResults && modalState.searchResults.length > 0 ? modalState.searchResults.map(result => <VideoResult result={result} handleVideoSelect={handleVideoSelect}/>) : null}
                </List>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    </Modal>
  )
}

export default CreateVideoModal;