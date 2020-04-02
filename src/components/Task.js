import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteIcon from '@material-ui/icons/Delete'
import Checkbox from '@material-ui/core/Checkbox'
import ReactTooltip from 'react-tooltip'
import { TodoContext } from '../App'
import { TextField } from '@material-ui/core'
import TaskDetails from './TaskDetails'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 800,
    border: '1px solid black',
    borderRadius: '5px',
    padding: '0px',
    margin: '10px'
  },
  listItemText: {
    fontSize: '20px',
    wordWrap: 'break-word'
  }
}))

export default function Task (props) {
  const taskObj = props.task
  const listIndex = props.listIndex
  const taskIndex = props.taskIndex
  const todoContext = useContext(TodoContext)
  const [editName, setEditName] = useState(false)
  const [newName, setNewName] = useState(taskObj.taskname)
  const todos = todoContext.todos
  const classes = useStyles()
  const updateTask = (obj, msg) => {
    obj.listid = todos[listIndex].id
    fetch('https://todomongoapi.herokuapp.com/task', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    }).then((res) => {
      if (res.status !== 204) return todoContext.setError(true)
      todoContext.setTodos([...todos])
      setEditName(false)
      todoContext.setSuccess(true)
      todoContext.setMessage(msg)
    }).catch(function (err) {
      todoContext.setError(true)
      console.log('Fetch Error :', err)
    })
  }
  const taskDone = (event) => {
    todos[listIndex].tasks[taskIndex].done = !todos[listIndex].tasks[taskIndex].done
    updateTask(todos[listIndex].tasks[taskIndex], 'Task Edited!')
  }
  const taskDetails = (taskObj) => {
    todos[listIndex].tasks[taskIndex] = taskObj
    updateTask(todos[listIndex].tasks[taskIndex], 'Task Details Updated!')
  }
  const toggleEditName = () => setEditName(!editName)
  const editTaskName = (event) => {
    if (event.key !== 'Enter') return null
    if (!newName) return setNewName(taskObj.taskname)
    todos[listIndex].tasks[taskIndex].taskname = newName
    updateTask(todos[listIndex].tasks[taskIndex], 'Task Renamed!')
  }
  const deleteTask = (event) => {
    const todos = todoContext.todos
    const objToBeDeleted = todos[listIndex].tasks[taskIndex]
    objToBeDeleted.listid = todos[listIndex].id
    window.fetch('https://todomongoapi.herokuapp.com/task', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(objToBeDeleted)
    }).then((res) => {
      if (res.status !== 204) return todoContext.setError(true)
      todos[listIndex].tasks = todos[listIndex].tasks.filter((task) => task.id !== objToBeDeleted.id)
      todoContext.setTodos([...todos])
      todoContext.setSuccess(true)
      todoContext.setMessage('Task deleted!')
    }).catch(function (err) {
      todoContext.setError(true)
      console.log('Fetch Error :', err)
    })
  }
  return (
    <>
      <List className={classes.root}>
        <ListItem dense button>
          <ListItemIcon>
            <Checkbox
              color='primary'
              edge='start'
              checked={taskObj.done}
              onChange={taskDone}
              tabIndex={-1}
              disableRipple
            />
          </ListItemIcon>
          {!editName && <ListItemText onClick={toggleEditName} classes={{ primary: classes.listItemText }} primary={newName} />}
          {editName &&
            <TextField
              autoFocus
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
              onKeyPress={editTaskName}
              onBlur={() => {
                setNewName(taskObj.taskname)
                toggleEditName()
              }}
              fullWidth
            />}
          {!props.section &&
            <Button data-tip='Delete' onClick={deleteTask}>
              <DeleteIcon />
            </Button>}
          {props.section &&
            <div>{taskObj.listname}</div>}
          <ListItemSecondaryAction>
            <TaskDetails taskObj={taskObj} taskDetails={taskDetails} />
          </ListItemSecondaryAction>
        </ListItem>
        <ReactTooltip />
      </List>
    </>
  )
}
