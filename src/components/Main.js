import React from 'react';
import Consumer from '../configContext';
import Password from './Password';
import AdminBox from './AdminBox';
import Activity from './Activity';
import ClassMenuItem from './ClassMenuItem';
import CreateClassModal from './CreateClassModal';
import Done from './Done';
import { List, Segment } from 'semantic-ui-react'
import AboutModal from './AboutModal';

const parentOrChild = (context) => {
  if(context.data.currentClass) {
    if(context.data.currentActivity && context.data.currentActivity !== "done") {
      return (<Activity context={context} classId={context.data.currentClass} activityId={context.data.currentActivity} />)
    } else if (context.data.currentActivity === "done") {
      return (<Done context={context}/>)
    } else {
      let classItem = context.data.classes.find(classItem => classItem.id === context.data.currentClass)
      context.setCurrentActivity(classItem.activities[0].activityId)
    }
  } else {
    return  (
      <div>
        <div>{context.data.password ? <AdminBox context={context}/> : <Password />}</div>
        <Segment vertical>
          {context.data.password === "" ? null : <span>Classes <CreateClassModal context={context} /></span>}
        </Segment>
        <div className="listBox">
          <List selection verticalAlign='middle' divided relaxed>
            {context.data.classes.map(classItem => <ClassMenuItem key={classItem.id} classId={classItem.id} {...classItem} context={context}/>)}
          </List>
        </div>
        <AboutModal />
      </div>
    )
  }
}

export default function Main() {  
  return (
    <Consumer>
      {context => {
        return (
          <div>
            {parentOrChild(context)}
          </div>
        )
      }}
    </Consumer>
  )
}