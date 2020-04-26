import React, { createContext } from "react";
import  { idbKeyval } from './indexDB'
import { v4 as uuid } from 'uuid';

const { Provider, Consumer } = createContext();


const videoTemplate = {
  type: "Video",
  activityId: null,
  title: "",
  url: "",
  description: "",
  advanceAtEnd: true,
  completionApprovalRequired: false
}

const taskTemplate = {
  type: "Task",
  activityId: null,
  title: "",
  description: "",
  lengthOfTask: 600,
  startTime: null,
  completionApprovalRequired: false
}

// const checklistTemplate = {
//   type: "Checklist",
//   activityId: null,
//   title: "",
//   list: [],
//   completionApprovalRequired: false
// }

// const checklistItem = {
//   id: null,
//   note: "",
//   completed: false
// }

// const resourceTemplate = {
//   type: "resource",
//   activityId: null,
//   title: "",
//   list: [],
//   completionApprovalRequired: false
// }

const classTemplate = {
  type: "class",
  id: null,
  title: "",
  description: "",
  activities: []
}

class ConfigProvider extends React.Component {
  state = {
    data: {
      password: "",
      classes: [],
      currentClass: null,
      currentActivity: null
    },
    setPassword: (password = "") => {
      this.setState(prevState => ({
        ...prevState,
        data: {
          ...prevState.data,
          password
        }
      }))
    },
    createClass: (title = "", description = "") => {
      let newClass = { ...classTemplate, 
                        id: uuid(),
                        title, 
                        description
                      }
      this.setState(prevState => ({ 
        ...prevState, 
        data: {
          ...prevState.data,
          classes: [ ...prevState.data.classes, newClass ]
        }
      }))
    },
    updateClass: (id, title = "", description = "") => {
      let newClass = { ...classTemplate, 
                        id,
                        title, 
                        description
                      }
      this.setState(prevState => ({ 
        ...prevState, 
        data: {
          ...prevState.data,
          classes: prevState.data.classes.map(classItem => classItem.id === id ? newClass : classItem)
        }
      }))
    },
    deleteClass: (id) => {
      this.setState(prevState => ({ 
        ...prevState, 
        data: {
          ...prevState.data,
          classes: prevState.data.classes.filter(classItem => classItem.id === id ? false : classItem)
        }
      }))
    },
    addVideoToClass: (classId, title = "", url = "", description = "", advanceAtEnd, completionApprovalRequired = false) => {
      let newVideo = { ...videoTemplate,
                        activityId: uuid(),
                        title, 
                        url, 
                        description, 
                        advanceAtEnd,
                        completionApprovalRequired
                      }
      let classToUpdate = this.state.data.classes.find(classItem => classItem.id === classId)
      classToUpdate.activities.push(newVideo)
      this.setState(prevState => ({ 
        ...prevState, 
        data: {
          ...prevState.data,
          classes: prevState.data.classes.map(classItem => classItem.id === classToUpdate.id ? classToUpdate : classItem)
        }
      }))
    },
    updateVideo: (classId, title = "", url = "", description = "", advanceAtEnd, completionApprovalRequired = false, activityId) => {
      let newVideo = { ...videoTemplate, 
        activityId,
        title, 
        url, 
        description, 
        advanceAtEnd,
        completionApprovalRequired
      }
      this.setState(prevState => ({
        ...prevState,
        data: {
          ...prevState.data,
          classes: prevState.data.classes.map(classItem => {
            if (classItem.id === classId) {
              classItem.activities = classItem.activities.map(activity => activity.activityId === activityId ? newVideo : activity)
            }
            return classItem
          })
        }
      }))
    },
    deleteActivity: (classId, activityId) => {
      this.setState(prevState => ({
        ...prevState,
        data: {
          ...prevState.data,
          classes: prevState.data.classes.map(classItem => {
            if (classItem.id === classId) {
              classItem.activities = classItem.activities.filter(activity => activity.activityId === activityId ? false : activity)
            }
            return classItem
          })
        }
      }))
    },
    addTaskToClass: (classId, title = "", description = "", completionApprovalRequired = false) => {
      let newTask = { ...taskTemplate, 
                        activityId: uuid(),
                        title, 
                        description, 
                        completionApprovalRequired
                      }
      let classToUpdate = this.state.data.classes.find(classItem => classItem.id === classId)
      classToUpdate.activities.push(newTask)
      this.setState(prevState => ({ 
        ...prevState, 
        data: {
          ...prevState.data,
          classes: prevState.data.classes.map(classItem => classItem.id === classToUpdate.id ? classToUpdate : classItem)
        }
      }))
    },
    updateTask: (classId, title = "", url = "", description = "", advanceAtEnd, completionApprovalRequired = false, activityId) => {
      let newTask = { ...taskTemplate, 
        activityId,
        title, 
        description, 
        completionApprovalRequired
      }
      this.setState(prevState => ({
        ...prevState,
        data: {
          ...prevState.data,
          classes: prevState.data.classes.map(classItem => {
            if (classItem.id === classId) {
              classItem.activities = classItem.activities.map(activity => activity.activityId === activityId ? newTask : activity)
            }
            return classItem
          })
        }
      }))
    },
    setCurrentClass: classId => {
      let currentClass = this.state.data.classes.find(classItem => classItem.id === classId)
      this.setState(prevState => ({
        ...prevState,
        data: {
          ...prevState.data,
          currentClass: classId,
          currentActivity: currentClass.activities[0].activityId
        }
      }))
    },
    setCurrentActivity: activityId => {
      this.setState(prevState => ({
        ...prevState,
        data: {
          ...prevState.data,
          currentActivity: activityId
        }
      }))
    },
    advanceToNextActivity: () => {
      let currentClass = this.state.data.classes.find(classItem => classItem.id === this.state.data.currentClass)
      let currentActivityIndex
      try {
        currentActivityIndex = currentClass.activities.findIndex(activity => activity.activityId === this.state.data.currentActivity)
      } catch {
        this.setState(prevState => ({
          ...prevState,
          data: {
            ...prevState.data,
            currentClass: null,
            currentActivity: null
          }
        }))
        return null
      }
      
      if (currentClass.activities[currentActivityIndex+1]) {
        this.setState(prevState => ({
          ...prevState,
          data: {
            ...prevState.data,
            currentActivity: currentClass.activities[currentActivityIndex+1].activityId
          }
        }))
      } else if (!currentClass.activities[currentActivityIndex+1] && this.state.data.currentActivity !== "done") {
        this.setState(prevState => ({
          ...prevState,
          data: {
            ...prevState.data,
            currentClass: "done",
            currentActivity: "done"
          }
        }))
      } else {
        this.setState(prevState => ({
          ...prevState,
          data: {
            ...prevState.data,
            currentClass: null,
            currentActivity: null
          }
        }))
      }
    },
    endClass: () => {
      this.setState(prevState => ({
        ...prevState,
        data: {
          ...prevState.data,
          currentClass: null,
          currentActivity: null
        }
      }))
    }
  };

  async componentDidMount() {
    let data = await idbKeyval.get('data')
    if (!data) {
      await idbKeyval.set('data', this.state.data)
    } else {
      this.setState({ data })
    }
  }

  async componentDidUpdate() {
    let data = await idbKeyval.get('data')
    if (JSON.stringify(data) !== JSON.stringify(this.state.data)) {
      await idbKeyval.set('data', this.state.data)
    }
  }

  render() {
    console.log(this.state.currentActivity)
    return (
      <Provider
        value={{ ...this.state }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { ConfigProvider };
export default Consumer;