import React from 'react'
import PasswordRequired from './PasswordRequired'

const AdminBox = ({context}) => {
  return (
    <div>
      Password set <PasswordRequired buttonText="Change Password" text="Change Password" password={context.data.password} action={context.setPassword}/>
    </div>
  )
}

export default AdminBox