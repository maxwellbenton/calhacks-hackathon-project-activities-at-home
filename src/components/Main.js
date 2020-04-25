import React, {useState} from 'react';
import Consumer from '../configContext';
import Password from './Password';
import AdminBox from './AdminBox';
import ClassMenuItem from './ClassMenuItem';
import CreateClassModal from './CreateClassModal';
import { List } from 'semantic-ui-react'

export default function Main() {
  let [data, setData] = useState({title: '1', description: '2'})
  
  return (
    <Consumer>
      {context => {
        return (
          <div>
            <div>{context.data.password ? <AdminBox /> : <Password />}</div>
            Classes <CreateClassModal context={context} />
            <div className="listBox">
              <List selection verticalAlign='middle' divided relaxed>
                {context.data.classes.map(classItem => <ClassMenuItem key={classItem.id} classId={classItem.id} {...classItem} context={context}/>)}
              </List>
            </div>
          </div>
        )
      }}
    </Consumer>
  )
}