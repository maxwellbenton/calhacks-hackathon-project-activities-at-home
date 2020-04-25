import React, {useState} from 'react'
import Consumer from '../configContext'

export default function Password() {  
  let [formData, setFormData] = useState({
    passwordInput: "",
    passwordConfirm: "",
    passwordFail: false
  })

  function handleSubmit(event, context) {
    event.preventDefault()
    if (event.target['passwordInput'].value === event.target['passwordConfirm'].value) {
      context.setPassword(event.target['passwordInput'].value)
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
          <div className="fullpage">
            <form onSubmit={(event) => handleSubmit(event, context)}>
              {formData.passwordFail ? <div>Passwords must match</div> : null}
              <label htmlFor="passwordInput">
                Enter password
                <input id="passwordInput" type="text" onChange={handleChange} value={formData.passwordInput} />
              </label>
              <label htmlFor="passwordConfirm">
                Confirm password
                <input id="passwordConfirm" type="text" onChange={handleChange} value={formData.passwordConfirm} />
              </label>
              <input type="submit" />
            </form>
          </div>
        )
      }}
    </Consumer>
  )
}