import React from 'react'
import PasswordRequired from './PasswordRequired'
import { Segment } from 'semantic-ui-react'

const AdminBox = ({context}) => {
  return (
    <Segment vertical>
      Password set <PasswordRequired buttonText="Change Password" text="Change Password" password={context.data.password} action={context.setPassword}/>
    </Segment>
  )
}

export default AdminBox