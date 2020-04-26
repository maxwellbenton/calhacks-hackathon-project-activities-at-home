import React, {useState} from 'react'
import Consumer from '../configContext'
import { Segment, Form, Button, Icon } from 'semantic-ui-react'

export default function Password() {  
  let [formData, setFormData] = useState({
    passwordInput: "",
    passwordConfirm: "",
    passwordFail: false
  })

  function handleSubmit(event, context) {
    event.preventDefault()
    if (formData.passwordInput === formData.passwordConfirm) {
      context.setPassword(formData.passwordInput)
    } else {
      setFormData(prevState => ({
        ...prevState,
        passwordInput: "",
        passwordConfirm: "",
        passwordFail: true
      }))
    }
  }
  function handleChange(event) {
    event.persist()
    setFormData(prevState => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }))
  }

  return (
    <Consumer>
      {context => {
        return (
          <Segment style={{maxWidth: '80vw', margin: 'auto'}}>
            <Form onSubmit={(event) => handleSubmit(event, context)}>
              {formData.passwordFail ? <div>Passwords must match</div> : null}
                <Form.Input type="password" label="Enter password" id="passwordInput" onChange={handleChange} value={formData.passwordInput} />
                <Form.Input type="password" label="Confirm password" id="passwordConfirm" onChange={handleChange} value={formData.passwordConfirm} />
                <Button color='green' inverted onClick={(event) => handleSubmit(event, context)}>
                  <Icon name='checkmark' /> Create Password
                </Button>
            </Form>
          </Segment>
        )
      }}
    </Consumer>
  )
}