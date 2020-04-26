import React from 'react'
import PasswordRequired from './PasswordRequired'

const Done = ({context}) => {
  return (
    <div>
      <h1>DONE!</h1>
      <PasswordRequired buttonText="Finish Class" text="Finish Class" password={context.data.password} action={context.advanceToNextActivity}/>
    </div>
  )
}

export default Done;